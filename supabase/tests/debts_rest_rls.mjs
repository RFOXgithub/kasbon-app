import { randomUUID } from "node:crypto";
import { readFileSync } from "node:fs";
import { once } from "node:events";
import { createInterface } from "node:readline";

const env = Object.fromEntries(
  readFileSync(".env", "utf8")
    .split(/\r?\n/)
    .filter((line) => /^[A-Za-z_][A-Za-z0-9_]*=/.test(line))
    .map((line) => {
      const separator = line.indexOf("=");
      return [line.slice(0, separator), line.slice(separator + 1).trim().replace(/^"|"$/g, "")];
    }),
);

const baseUrl = env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const key = env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const appUrl = process.env.KASBON_APP_URL?.replace(/\/$/, "");
if (!baseUrl || !key) throw new Error("Supabase URL atau publishable key belum tersedia di .env.");

async function request(url, options) {
  const response = await fetch(url, options);
  return { status: response.status, body: await response.json().catch(() => null) };
}

async function login({ email, password }) {
  const result = await request(`${baseUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: { apikey: key, "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!result.body?.access_token || !result.body?.user?.id) {
    throw new Error(`Login akun uji gagal (HTTP ${result.status}).`);
  }
  return { token: result.body.access_token, id: result.body.user.id };
}

function rest(user, method, path = "", body) {
  return request(`${baseUrl}/rest/v1/debts${path}`, {
    method,
    headers: {
      apikey: key,
      Authorization: `Bearer ${user.token}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

let failures = 0;
function check(label, passed, result) {
  console.log(`${label}: ${passed ? "PASS" : "FAIL"} (HTTP ${result.status})`);
  if (!passed) failures += 1;
}

if (process.stdin.isTTY) process.stdin.setRawMode(true);
const input = createInterface({ input: process.stdin, terminal: false });
const [line] = await once(input, "line");
input.close();
if (process.stdin.isTTY) process.stdin.setRawMode(false);
const credentials = JSON.parse(line);
const userA = await login(credentials.a);
const userB = await login(credentials.b);
if (userA.id === userB.id) throw new Error("Dua akun uji harus berbeda.");
console.log("Login dua akun: PASS");

let rowA;
let rowB;
let crossInsertedRow;

try {
  const suffix = randomUUID().slice(0, 8);
  const createdA = await rest(userA, "POST", "", {
    user_id: userA.id, type: "i_owe", counterpart_name: `RLS audit A ${suffix}`, amount: 1,
  });
  rowA = Array.isArray(createdA.body) ? createdA.body[0] : null;
  check("A membuat catatan sendiri", createdA.status === 201 && !!rowA?.id, createdA);

  const createdB = await rest(userB, "POST", "", {
    user_id: userB.id, type: "i_owe", counterpart_name: `RLS audit B ${suffix}`, amount: 1,
  });
  rowB = Array.isArray(createdB.body) ? createdB.body[0] : null;
  check("B membuat catatan sendiri", createdB.status === 201 && !!rowB?.id, createdB);
  if (!rowA?.id || !rowB?.id) throw new Error("Catatan uji gagal dibuat.");

  for (const [actor, target, name] of [[userA, rowB, "A ke B"], [userB, rowA, "B ke A"]]) {
    const path = `?id=eq.${target.id}&select=id,user_id,note`;
    const read = await rest(actor, "GET", path);
    check(`${name} SELECT ditolak`, read.status === 200 && Array.isArray(read.body) && read.body.length === 0, read);
    const update = await rest(actor, "PATCH", path, { note: "unauthorized" });
    check(`${name} UPDATE ditolak`, update.status === 200 && Array.isArray(update.body) && update.body.length === 0, update);
    const remove = await rest(actor, "DELETE", path);
    check(`${name} DELETE ditolak`, remove.status === 200 && Array.isArray(remove.body) && remove.body.length === 0, remove);
  }

  const crossInsert = await rest(userB, "POST", "", {
    user_id: userA.id, type: "i_owe", counterpart_name: `RLS audit forbidden ${suffix}`, amount: 1,
  });
  crossInsertedRow = Array.isArray(crossInsert.body) ? crossInsert.body[0] : null;
  check("B INSERT untuk A ditolak", crossInsert.status === 403 && crossInsert.body?.code === "42501", crossInsert);

  const transfer = await rest(userA, "PATCH", `?id=eq.${rowA.id}&select=id,user_id`, { user_id: userB.id });
  check("A tidak bisa memindahkan catatan ke B", transfer.status === 403 && transfer.body?.code === "42501", transfer);

  if (appUrl) {
    const settled = await request(`${appUrl}/api/debts/${rowA.id}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${userA.token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ settled: true }),
    });
    check("API menandai lunas di server", settled.status === 200 && typeof settled.body?.data?.settled_at === "string", settled);
    const persisted = await rest(userA, "GET", `?id=eq.${rowA.id}&select=id,settled_at`);
    check("Status lunas tersimpan setelah baca ulang", persisted.status === 200 && typeof persisted.body?.[0]?.settled_at === "string", persisted);
  }

  for (const [actor, target, name] of [[userA, rowA, "A"], [userB, rowB, "B"]]) {
    const own = await rest(actor, "GET", `?id=eq.${target.id}&select=id,user_id,note`);
    check(`Catatan ${name} tetap utuh`, own.status === 200 && Array.isArray(own.body) && own.body.length === 1 && own.body[0].user_id === actor.id && own.body[0].note === null, own);
  }
} finally {
  for (const [owner, row, name] of [[userA, rowA, "A"], [userB, rowB, "B"], [userA, crossInsertedRow, "lintas akun"]]) {
    if (!row?.id) continue;
    const deleted = await rest(owner, "DELETE", `?id=eq.${row.id}&select=id`);
    check(`Bersihkan catatan ${name}`, deleted.status === 200 && Array.isArray(deleted.body) && deleted.body.length === 1, deleted);
  }
}

console.log(`Total gagal: ${failures}`);
process.exitCode = failures ? 1 : 0;

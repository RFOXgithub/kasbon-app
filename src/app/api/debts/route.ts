import { getAuthenticatedContext } from "@/lib/auth/context";
import { debtColumns } from "@/lib/api/debt-columns";
import { errorResponse, validationDetails } from "@/lib/api/response";
import { createDebtSchema, debtQuerySchema } from "@/lib/validation/debt";

export async function GET(request: Request) {
  const auth = await getAuthenticatedContext(request);

  if (!auth) {
    return errorResponse("Anda harus login untuk mengakses data.", 401);
  }

  const { supabase, userId } = auth;

  const searchParams = new URL(request.url).searchParams;

  const validation = debtQuerySchema.safeParse({
    status: searchParams.get("status") ?? undefined,
    type: searchParams.get("type") ?? undefined,
  });

  if (!validation.success) {
    return errorResponse(
      "Query filter tidak valid.",
      400,
      validationDetails(validation.error),
    );
  }

  const { status, type } = validation.data;

  let query = supabase
    .from("debts")
    .select(debtColumns)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (type !== "all") {
    query = query.eq("type", type);
  }

  if (status === "unsettled") {
    query = query.is("settled_at", null);
  }

  if (status === "settled") {
    query = query.not("settled_at", "is", null);
  }

  const { data, error } = await query;

  if (error) {
    console.error("GET /api/debts gagal:", error);

    return errorResponse("Data kasbon tidak dapat dimuat.", 500);
  }

  return Response.json(
    {
      data,
    },
    { status: 200 },
  );
}

export async function POST(request: Request) {
  const auth = await getAuthenticatedContext(request);

  if (!auth) {
    return errorResponse("Anda harus login untuk menambahkan data.", 401);
  }

  const { supabase, userId } = auth;

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return errorResponse("Body request harus berupa JSON yang valid.", 400);
  }

  const validation = createDebtSchema.safeParse(body);

  if (!validation.success) {
    return errorResponse(
      "Data yang dikirim tidak valid.",
      400,
      validationDetails(validation.error),
    );
  }

  const input = validation.data;

  const { data, error } = await supabase
    .from("debts")
    .insert({
      user_id: userId,
      type: input.type,
      counterpart_name: input.counterpart_name,
      amount: input.amount,
      note: input.note,
      due_date: input.due_date,
    })
    .select(debtColumns)
    .single();

  if (error) {
    console.error("POST /api/debts gagal:", error);

    if (error.code === "23505") {
      return errorResponse("Data tersebut sudah tersedia.", 409);
    }

    if (error.code === "23514") {
      return errorResponse("Data tidak memenuhi aturan penyimpanan.", 400);
    }

    return errorResponse("Data kasbon gagal disimpan.", 500);
  }

  return Response.json(
    {
      message: "Data kasbon berhasil ditambahkan.",
      data,
    },
    { status: 201 },
  );
}

import { getAuthenticatedContext } from "@/lib/auth/context";
import { debtColumns } from "@/lib/api/debt-columns";
import { errorResponse, validationDetails } from "@/lib/api/response";
import { debtIdSchema, updateDebtSchema } from "@/lib/validation/debt";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type DebtUpdates = {
  type?: "owed_to_me" | "i_owe";
  counterpart_name?: string;
  amount?: number;
  note?: string | null;
  due_date?: string | null;
  settled_at?: string | null;
};

export async function PATCH(request: Request, context: RouteContext) {
  const auth = await getAuthenticatedContext(request);

  if (!auth) {
    return errorResponse("Anda harus login untuk memperbarui data.", 401);
  }

  const { supabase, userId } = auth;
  const { id } = await context.params;

  const idValidation = debtIdSchema.safeParse(id);

  if (!idValidation.success) {
    return errorResponse(
      "ID transaksi tidak valid.",
      400,
      validationDetails(idValidation.error),
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return errorResponse("Body request harus berupa JSON yang valid.", 400);
  }

  const bodyValidation = updateDebtSchema.safeParse(body);

  if (!bodyValidation.success) {
    return errorResponse(
      "Data yang dikirim tidak valid.",
      400,
      validationDetails(bodyValidation.error),
    );
  }

  const input = bodyValidation.data;

  const { data: existingDebt, error: findError } = await supabase
    .from("debts")
    .select(debtColumns)
    .eq("id", idValidation.data)
    .eq("user_id", userId)
    .maybeSingle();

  if (findError) {
    console.error("Pencarian data kasbon gagal:", findError);

    return errorResponse("Data kasbon tidak dapat diperiksa.", 500);
  }

  if (!existingDebt) {
    return errorResponse("Data kasbon tidak ditemukan.", 404);
  }

  const updates: DebtUpdates = {};

  if (input.type !== undefined) {
    updates.type = input.type;
  }

  if (input.counterpart_name !== undefined) {
    updates.counterpart_name = input.counterpart_name;
  }

  if (input.amount !== undefined) {
    updates.amount = input.amount;
  }

  if (input.note !== undefined) {
    updates.note = input.note;
  }

  if (input.due_date !== undefined) {
    updates.due_date = input.due_date;
  }

  if (input.settled !== undefined) {
    const currentlySettled = existingDebt.settled_at !== null;

    if (input.settled !== currentlySettled) {
      updates.settled_at = input.settled ? new Date().toISOString() : null;
    }
  }

  if (Object.keys(updates).length === 0) {
    return Response.json(
      {
        message: "Tidak ada perubahan pada data kasbon.",
        data: existingDebt,
      },
      { status: 200 },
    );
  }

  const { data, error } = await supabase
    .from("debts")
    .update(updates)
    .eq("id", idValidation.data)
    .eq("user_id", userId)
    .select(debtColumns)
    .maybeSingle();

  if (error) {
    console.error("PATCH /api/debts/[id] gagal:", error);

    if (error.code === "23514") {
      return errorResponse("Data tidak memenuhi aturan penyimpanan.", 400);
    }

    return errorResponse("Data kasbon gagal diperbarui.", 500);
  }

  if (!data) {
    return errorResponse("Data kasbon tidak ditemukan.", 404);
  }

  return Response.json(
    {
      message: "Data kasbon berhasil diperbarui.",
      data,
    },
    { status: 200 },
  );
}

export async function DELETE(request: Request, context: RouteContext) {
  const auth = await getAuthenticatedContext(request);

  if (!auth) {
    return errorResponse("Anda harus login untuk menghapus data.", 401);
  }

  const { supabase, userId } = auth;
  const { id } = await context.params;

  const idValidation = debtIdSchema.safeParse(id);

  if (!idValidation.success) {
    return errorResponse(
      "ID transaksi tidak valid.",
      400,
      validationDetails(idValidation.error),
    );
  }

  const { data, error } = await supabase
    .from("debts")
    .delete()
    .eq("id", idValidation.data)
    .eq("user_id", userId)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("DELETE /api/debts/[id] gagal:", error);

    return errorResponse("Data kasbon gagal dihapus.", 500);
  }

  if (!data) {
    return errorResponse("Data kasbon tidak ditemukan.", 404);
  }

  return Response.json(
    {
      message: "Data kasbon berhasil dihapus.",
    },
    { status: 200 },
  );
}

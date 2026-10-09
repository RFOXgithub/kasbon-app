import { z } from "zod";

const debtTypeSchema = z.enum(["owed_to_me", "i_owe"], {
  error: "Tipe transaksi harus owed_to_me atau i_owe.",
});

const dateSchema = z
  .string({
    error: "Tanggal harus berupa teks.",
  })
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Tanggal harus menggunakan format YYYY-MM-DD.")
  .refine((value) => {
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));

    return (
      date.getUTCFullYear() === year &&
      date.getUTCMonth() === month - 1 &&
      date.getUTCDate() === day
    );
  }, "Tanggal tidak valid.");

const nullableDateSchema = z.preprocess(
  (value) => (value === "" ? null : value),
  dateSchema.nullable(),
);

const nullableNoteSchema = z
  .union([
    z
      .string({
        error: "Catatan harus berupa teks.",
      })
      .trim()
      .max(200, "Catatan maksimal 200 karakter."),
    z.null(),
  ])
  .transform((value) => (value === "" ? null : value));

const debtFieldsSchema = z.object({
  type: debtTypeSchema,

  counterpart_name: z
    .string({
      error: "Nama orang wajib diisi.",
    })
    .trim()
    .min(1, "Nama orang wajib diisi.")
    .max(100, "Nama orang maksimal 100 karakter."),

  amount: z
    .number({
      error: "Jumlah harus berupa angka.",
    })
    .refine(Number.isSafeInteger, "Jumlah harus berupa Rupiah utuh tanpa desimal.")
    .positive("Jumlah harus lebih dari 0.")
    .max(Number.MAX_SAFE_INTEGER, "Jumlah melebihi batas angka yang didukung."),

  note: nullableNoteSchema.optional(),

  due_date: nullableDateSchema.optional(),
});

export const createDebtSchema = debtFieldsSchema.extend({
  note: nullableNoteSchema.optional().default(null),
  due_date: nullableDateSchema.optional().default(null),
});

export const updateDebtSchema = debtFieldsSchema
  .partial()
  .extend({
    settled: z
      .boolean({
        error: "Status lunas harus berupa true atau false.",
      })
      .optional(),
  })
  .refine(
    (value) =>
      Object.values(value).some((fieldValue) => fieldValue !== undefined),
    {
      message: "Minimal satu data harus dikirim untuk diperbarui.",
    },
  );

export const debtQuerySchema = z.object({
  status: z
    .enum(["all", "unsettled", "settled"], {
      error: "Filter status tidak valid.",
    })
    .default("all"),

  type: z
    .enum(["all", "owed_to_me", "i_owe"], {
      error: "Filter tipe tidak valid.",
    })
    .default("all"),
});

export const debtIdSchema = z
  .string({
    error: "ID transaksi wajib diisi.",
  })
  .uuid("Format ID transaksi tidak valid.");

export type CreateDebtInput = z.infer<typeof createDebtSchema>;
export type UpdateDebtInput = z.infer<typeof updateDebtSchema>;

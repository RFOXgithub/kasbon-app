export type DebtType = "owed_to_me" | "i_owe";

export type Debt = {
  id: string;
  type: DebtType;
  counterpart_name: string;
  amount: number;
  note: string | null;
  due_date: string | null;
  settled_at: string | null;
  created_at: string;
  updated_at: string;
};

export type DebtInput = Pick<
  Debt,
  "type" | "counterpart_name" | "amount" | "note" | "due_date"
>;

export type DebtListResponse = {
  data: Debt[];
};

export type DebtMutationResponse = {
  message: string;
  data: Debt;
};

export type ApiErrorResponse = {
  error: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
};

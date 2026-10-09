import type { ZodError } from "zod";

type ErrorStatus = 400 | 401 | 404 | 409 | 500;

export function errorResponse(
  message: string,
  status: ErrorStatus,
  details?: Array<{
    field: string;
    message: string;
  }>,
) {
  return Response.json(
    {
      error: message,
      ...(details ? { details } : {}),
    },
    { status },
  );
}

export function validationDetails(error: ZodError) {
  return error.issues.map((issue) => ({
    field: issue.path.map(String).join(".") || "body",
    message: issue.message,
  }));
}

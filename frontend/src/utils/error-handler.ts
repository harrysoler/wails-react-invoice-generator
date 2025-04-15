import { Action, toast } from "sonner";

export function handleError(error: unknown, action?: Action) {
  if (error === undefined) return;

  console.error(error);
  toast.error(String(error), { action });
}

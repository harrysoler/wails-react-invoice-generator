import { Action, toast } from "sonner";

export function handleError(error: unknown, action?: Action) {
  console.error(error);
  toast.error(String(error), { action });
}

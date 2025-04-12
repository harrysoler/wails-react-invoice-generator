import { toast } from "sonner";

export function handleError(error: unknown) {
  console.error(error);
  toast.error(String(error));
}

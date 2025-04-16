import { domain } from "@wailsjs/go/models";
import { ResultAsync } from "neverthrow";
import { GenerateInvoice } from "@wailsjs/go/main/App";

export function generateInvoices(order: domain.Order, copies: number) {
  return ResultAsync.fromPromise(
    GenerateInvoice(order, copies),
    (error) => error,
  );
}

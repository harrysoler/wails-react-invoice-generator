import { domain } from "@wailsjs/go/models";
import { ResultAsync } from "neverthrow";
import { GenerateInvoice } from "@wailsjs/go/main/App";

export function generateInvoices(order: domain.Order, copies: number) {
  return ResultAsync.fromPromise(
    Promise.resolve(setTimeout(() => GenerateInvoice(order, copies), 3000)),
    (error) => error,
  );
}

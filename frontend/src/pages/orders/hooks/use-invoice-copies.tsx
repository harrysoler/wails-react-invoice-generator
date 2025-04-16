import { usePromiseModal } from "@prezly/react-promise-modal";
import { ResultAsync } from "neverthrow";

import { InvoiceCopiesDialog } from "@/pages/orders/components";
import { mapToErrorIfUndefined } from "@/utils";

export function useInvoiceCopies() {
  const invoiceCopiesDialog = usePromiseModal((props) => (
    <InvoiceCopiesDialog {...props} />
  ));

  function requestInvoiceAmount() {
    return ResultAsync.fromPromise(
      invoiceCopiesDialog.invoke(),
      () => {},
    ).andThen(mapToErrorIfUndefined);
  }

  return [invoiceCopiesDialog.modal, requestInvoiceAmount] as const;
}

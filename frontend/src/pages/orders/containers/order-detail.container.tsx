import {
  useQueryErrorResetBoundary,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { toast } from "sonner";

import {
  OrderDetail,
  OrderDetailErrorBoundary,
  OrderDetailSkeleton,
} from "@/pages/orders/components";
import { generateInvoices, getOrderByOdooReference } from "@/pages/orders/api";
import { useInvoiceCopies } from "@/pages/orders/hooks";
import { handleError } from "@/utils";
import { domain } from "@wailsjs/go/models";

type OrderDetailContainerProps = {
  odooReference: string;
};

function OrderDetailContainerImpl(props: OrderDetailContainerProps) {
  const [isExportLoading, setIsExportLoading] = useState<boolean>(false);
  const [invoiceAmountDialog, requestInvoiceAmount] = useInvoiceCopies();

  const { data: order } = useSuspenseQuery({
    queryKey: ["order", props.odooReference],
    queryFn: () => getOrderByOdooReference(props.odooReference),
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  async function onExport(order: domain.Order) {
    setIsExportLoading(true);

    const invoiceResult = await requestInvoiceAmount()
      .andThen((copies) => generateInvoices(order, copies));

    invoiceResult.match(
      (path) => toast.success("Guias generadas en: " + path),
      handleError,
    );

    setIsExportLoading(false);
  }

  return (
    <>
      <OrderDetail
        order={order}
        isExportLoading={isExportLoading}
        onExport={onExport}
      />
      {invoiceAmountDialog}
    </>
  );
}

export function OrderDetailContainer(props: OrderDetailContainerProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary onReset={reset} FallbackComponent={OrderDetailErrorBoundary}>
      <Suspense fallback={<OrderDetailSkeleton />}>
        <OrderDetailContainerImpl {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { generateInvoices, getOrderByOdooReference } from "@/pages/orders/api";
import { useInvoiceCopies } from "@/pages/orders/hooks";
import { OrderDetail, OrderDetailSkeleton } from "@/pages/orders/components";
import { handleError } from "@/utils";
import { domain } from "@wailsjs/go/models";

type OrderDetailContainerProps = {
  odooReference: string;
};

export function OrderDetailContainer(props: OrderDetailContainerProps) {
  const [isExportLoading, setIsExportLoading] = useState<boolean>(false);
  const [invoiceAmountDialog, requestInvoiceAmount] = useInvoiceCopies();

  const { data: order, isLoading, error } = useQuery({
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

  if (isLoading) return <OrderDetailSkeleton/>;
  if (error) return <p className="text-destructive">Error {String(error)}</p>;
  if (order === undefined) return <p>Undefined order</p>;

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

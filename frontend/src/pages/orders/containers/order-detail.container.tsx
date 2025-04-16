import { useQuery } from "@tanstack/react-query";

import { getOrderByOdooReference } from "@/pages/orders/api";
import { OrderDetail } from "../components";
import { useState } from "react";
import { domain } from "@wailsjs/go/models";

type OrderDetailContainerProps = {
  odooReference: string;
};

export function OrderDetailContainer(props: OrderDetailContainerProps) {
  const [isExportLoading, setIsExportLoading] = useState<boolean>(false);

  const { data: order, isLoading, error } = useQuery({
    queryKey: ["order", props.odooReference],
    queryFn: () => getOrderByOdooReference(props.odooReference),
  });

  async function onExport(order: domain.Order) {
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-destructive">Error {String(error)}</p>;
  if (order === undefined) return <p>Undefined order</p>;

  return <OrderDetail order={order} isExportLoading={isExportLoading}/>;
}

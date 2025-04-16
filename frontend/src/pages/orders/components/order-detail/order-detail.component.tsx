import {
  ExportOrderButton,
  OrderDetailsList,
  OrderProductsTable,
} from "@/pages/orders/components";
import { domain } from "@wailsjs/go/models";

type OrderDetailProps = {
  order: domain.Order;
  onExport: (order: domain.Order) => void;
  isExportLoading: boolean;
};

export function OrderDetail(props: OrderDetailProps) {
  return (
    <main className="max-w-3xl mx-auto py-10">
      <div className="flex flex-row justify-between gap-6 py-4">
        <h1 className="pb-2 text-3xl font-semibold tracking-tight">
          {props.order.ClientName}
        </h1>
        <ExportOrderButton
          order={props.order}
          onExport={props.onExport}
          isLoading={props.isExportLoading}
        />
      </div>
      <section className="grid gap-4 md:gap-6 md:grid-cols-2">
        <OrderProductsTable products={props.order.Products} />
        <OrderDetailsList order={props.order} />
      </section>
    </main>
  );
}

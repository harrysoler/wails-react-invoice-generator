import { domain } from "@wailsjs/go/models";
import { OrderProductsTable } from "./order-products-table.component";
import { OrderDetailsList } from "./order-details-list.component";
import { ExportOrderButton } from "./export-order-button.component";

type OrderDetailProps = {
  order: domain.Order;
  onExport: (order: domain.Order) => void;
  isExportLoading: boolean;
};

export function OrderDetail(props: OrderDetailProps) {
  return (
    <main className="max-w-3xl mx-auto py-10">
      <div className="flex flex-row justify-between py-4">
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

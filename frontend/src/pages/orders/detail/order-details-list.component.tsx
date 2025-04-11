import { domain } from "@wailsjs/go/models";
import { CopyButton } from "./copy-button.component";

type OrderDetailsListProps = {
  order: domain.Order;
};

export function OrderDetailsList(props: OrderDetailsListProps) {
  return (
    <ul className="flex flex-col gap-4">
      <OrderDetail title="Referencia" value={props.order.ClientReference} />
      <OrderDetail title="Odoo" value={props.order.OdooReference} />
      <OrderDetail title="Ciudad" value={props.order.City} />
      <OrderDetail title="Dirección" value={props.order.Address} />
      <OrderDetail title="Teléfono" value={props.order.PhoneNumber} />
      <OrderDetail title="Plataforma" value={props.order.PlatformName} />
    </ul>
  );
}

type OrderDetailProps = {
  title: string;
  value: string;
};

function OrderDetail(props: OrderDetailProps) {
  return (
    <li className="flex flex-col">
      <div className="flex flex-row gap-2 items-center">
        <h3 className="scroll-m-20 text-md font-semibold tracking-tight leading-none">
          {props.title}
        </h3>
        <CopyButton value={props.value} className="text-muted-foreground"/>
      </div>
      <p>{props.value}</p>
    </li>
  );
}

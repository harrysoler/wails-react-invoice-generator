import { MapPin, Phone, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

import { getOrderEntry } from "@/helpers";
import { domain } from "@wailsjs/go/models";

type OrderCardProps = {
  order: domain.Order;
};

export function OrderCard(props: OrderCardProps) {
  const orderEntry = getOrderEntry(props.order);

  return (
    <li>
      <Link
        href={"/orders/" + orderEntry}
        className="flex flex-col items-start gap-4 border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <h2 className="text-xl font-semibold leading-none tracking-tight">
          {props.order.ClientName}
        </h2>
        <ul className="flex flex-col gap-2">
          <CardDetailItem
            icon={ShoppingCart}
            value={props.order.PlatformName}
          />
          <CardDetailItem icon={MapPin} value={props.order.Address} />
          <pre>
            <CardDetailItem icon={Phone} value={props.order.PhoneNumber} />
          </pre>
        </ul>
        <div className="flex flex-row flex-wrap gap-2">
          <Badge>{props.order.City}</Badge>
          <Badge variant="secondary">
            {props.order.Products.length} Productos
          </Badge>
        </div>
      </Link>
    </li>
  );
}

type CardDetailItemProps = {
  icon: React.ComponentType<
    { size?: number; className?: string }
  >;
  value: string;
};

function CardDetailItem(props: CardDetailItemProps) {
  return (
    <li className="flex items-start gap-4">
      <props.icon
        size={16}
        className="text-muted-foreground min-w-min"
      />
      <p className="text-xs text-wrap break-normal font-medium text-foreground whitespace-break-spaces">
        {props.value}
      </p>
    </li>
  );
}

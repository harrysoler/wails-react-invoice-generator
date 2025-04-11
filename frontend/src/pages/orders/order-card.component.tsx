import { domain } from "@wailsjs/go/models";
import { MapPin, Phone, ShoppingCart } from "lucide-react";
import { Link } from "wouter";

type OrderCardProps = {
  order: domain.Order;
};

export function OrderCard(props: OrderCardProps) {
  // TODO: Move to helper function
  const orderPath = props.order.ClientName.replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();

  return (
    <li>
      <Link
        href={orderPath}
        key={orderPath}
        className="flex flex-col items-start gap-2 border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <h2 className="pb-2 text-xl font-semibold tracking-tight">
          {props.order.ClientName}
        </h2>
        <CardDetail icon={ShoppingCart} value={props.order.PlatformName} />
        <CardDetail icon={MapPin} value={props.order.Address} />
        <CardDetail icon={Phone} value={props.order.PhoneNumber} />
      </Link>
    </li>
  );
}

type CardDetailProps = {
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties, className?: string }>;
  value: string;
};

function CardDetail(props: CardDetailProps) {
  return (
    <div className="flex items-start gap-4">
      <props.icon size={16} style={{ stroke: "var(--foreground)", minWidth: "min-content" }}/>
      <p className="text-xs text-wrap break-normal font-medium text-foreground whitespace-break-spaces">
        {props.value}
      </p>
    </div>
  );
}

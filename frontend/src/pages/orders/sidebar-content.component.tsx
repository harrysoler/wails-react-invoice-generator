import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { domain } from "@wailsjs/go/models";
import { OrderCard } from "./order-card.component";
import { getOrderEntry } from "@/helpers";

type SidebarContentProps = {
  orders: domain.Order[];
};

export function OrdersSidebarContent(props: SidebarContentProps) {
  return (
    <SidebarContent>
      <SidebarGroup className="p-0">
        <SidebarGroupContent>
          <ul>
            {props.orders.map((order) => (
              <OrderCard order={order} key={getOrderEntry(order)} />
            ))}
          </ul>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}

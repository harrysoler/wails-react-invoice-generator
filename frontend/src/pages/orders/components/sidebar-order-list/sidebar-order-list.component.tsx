import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

import { getOrderEntry } from "@/helpers";
import { OrderCard } from "@/pages/orders/components";
import { domain } from "@wailsjs/go/models";

type OrdersSidebarListProps = {
  orders: domain.Order[];
};

export function SidebarOrderList(props: OrdersSidebarListProps) {
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

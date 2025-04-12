import { Sidebar } from "@/components/ui/sidebar";
import { OrdersSidebarHeader } from "./sidebar-header";
import { caching, domain } from "@wailsjs/go/models";
import { OrdersSidebarContent } from "./sidebar-content.component";

type OrdersSidebarProps = {
  setFilter: React.Dispatch<React.SetStateAction<caching.OrderFilter>>;
  orders: domain.Order[];
};

export function OrdersSidebar(props: OrdersSidebarProps) {
    const platforms = new Set(props.orders.map((order) => order.PlatformName))
    const cities = new Set(props.orders.map((order) => order.City))

  return (
    <Sidebar className="flex flex-1">
      <OrdersSidebarHeader setFilter={props.setFilter} platforms={platforms} cities={cities} />
      <OrdersSidebarContent orders={props.orders}/>
    </Sidebar>
  );
}

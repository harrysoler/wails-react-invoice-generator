import { SidebarProvider } from "@/components/ui/sidebar";

import {
  OrderDetailContainer,
  OrdersSidebarContainer,
} from "@/pages/orders/containers";

export function OrdersPage() {
  return (
    <SidebarProvider>
      <OrdersSidebarContainer />
      <OrderDetailContainer />
    </SidebarProvider>
  );
}

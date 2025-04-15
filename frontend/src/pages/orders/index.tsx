import { SidebarProvider } from "@/components/ui/sidebar";

import { OrdersSidebarContainer } from "@/pages/orders/containers";

export function OrdersPage() {
  return (
    <SidebarProvider>
      <OrdersSidebarContainer />
    </SidebarProvider>
  );
}

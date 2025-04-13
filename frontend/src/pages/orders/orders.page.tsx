import { SidebarProvider } from "@/components/ui/sidebar";
import { OrdersSidebar } from "./sidebar";

export function OrdersPage() {

  return (
    <SidebarProvider>
      <OrdersSidebar />
    </SidebarProvider>
  );
}

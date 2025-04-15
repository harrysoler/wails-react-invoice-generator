import { SidebarProvider } from "@/components/ui/sidebar";

import { OrdersSidebarContainer } from "@/pages/orders/containers";
import { Route, Switch } from "wouter";

export function OrdersPage() {
  return (
    <SidebarProvider>
      <OrdersSidebarContainer />
      <Switch>
        <Route path=":order">
          {(params) => <p>Param: {params.order}</p>}
        </Route>
        <Route>
          404
        </Route>
      </Switch>
    </SidebarProvider>
  );
}

import { SidebarProvider } from "@/components/ui/sidebar";

import { OrdersSidebarContainer } from "@/pages/orders/containers";
import { Route, Switch } from "wouter";
import { OrderDetailContainer } from "./containers/order-detail.container";

export function OrdersPage() {
  return (
    <SidebarProvider>
      <OrdersSidebarContainer />
      <Switch>
        <Route path=":odoo">
          {(params) => <OrderDetailContainer odooReference={params.odoo} />}
        </Route>
        <Route>
          Sin order seleccionada
        </Route>
      </Switch>
    </SidebarProvider>
  );
}

import { SidebarProvider } from "@/components/ui/sidebar";

import { OrdersSidebarContainer } from "@/pages/orders/containers";
import { Route, Switch } from "wouter";
import { OrderDetailContainer } from "./containers/order-detail.container";
import { OrderNotSelected } from "./components";

export function OrdersPage() {
  return (
    <SidebarProvider>
      <OrdersSidebarContainer />
      <Switch>
        <Route path=":odoo">
          {(params) => <OrderDetailContainer odooReference={params.odoo} />}
        </Route>
        <Route component={OrderNotSelected} />
      </Switch>
    </SidebarProvider>
  );
}

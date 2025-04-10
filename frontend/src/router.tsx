import { Route, Switch } from "wouter";
import { OrdersSidebarHeader } from "@/pages/orders/sidebar-header";

export function Router() {
  return (
    <Switch>
      <Route path="/">
        <OrdersSidebarHeader />
      </Route>
      <Route path="orders">
        Orders
      </Route>
    </Switch>
  );
}

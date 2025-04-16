import { Route, Switch } from "wouter";
import { SourceSelectPage } from "./pages/source-select";
import { OrdersPage } from "./pages/orders";

export function Router() {
  return (
    <Switch>
      <Route path="/" component={SourceSelectPage} />
      <Route path="/orders" component={OrdersPage}/>
    </Switch>
  );
}

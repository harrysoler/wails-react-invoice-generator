import { Route, Switch } from "wouter";
import { SourceSelectPage } from "./pages/source-select";

export function Router() {
  return (
    <Switch>
      <Route path="/">
        <SourceSelectPage />
      </Route>
      <Route path="orders">
        Orders
      </Route>
    </Switch>
  );
}

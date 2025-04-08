import { Route, Switch } from "wouter";

export function Router() {
  return (
    <Switch>
      <Route path="/">
        Index
      </Route>
      <Route path="orders">
        Orders
      </Route>
    </Switch>
  );
}

import { Route, Switch } from "wouter";
import { Button } from "./components/ui/button";

export function Router() {
  return (
    <Switch>
      <Route path="/">
        <Button>Button</Button>
      </Route>
      <Route path="orders">
        Orders
      </Route>
    </Switch>
  );
}

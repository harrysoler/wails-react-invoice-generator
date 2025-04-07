import { Link, Route, Switch } from "wouter";

function App() {
  return (
    <>
      <Link href="/users/1">Profile</Link>
      <Route path="/users/*">Users</Route>

      <Switch>
        <Route path="/inbox">
          Inbox
        </Route>
        <Route path="/users/:name">
          {(params) => <>Hello, {params.name}!</>}
        </Route>

        <Route>
          Not found
        </Route>
      </Switch>
    </>
  );
}

export default App;

import { Redirect, Route } from "react-router";

function ProtectedRoute({ connected, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={() =>
        connected ? <Component connected={connected} /> : <Redirect to="/home" />
      }
    />
  );
}

export default ProtectedRoute;

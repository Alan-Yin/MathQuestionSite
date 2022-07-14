import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  let storage = window.localStorage;
  const { login } = storage;
  console.log("this", login);

  // return <Redirect to="/" />;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        console.log(
          "render",
          login==='true' ? <Component {...props} /> : <Redirect to="/" />
        )
      }
    />
  );
}

export default ProtectedRoute;

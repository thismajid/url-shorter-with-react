import React from "react";
import { Route } from "react-router-dom";
import Redirecting from "./Redirecting";

const UserRoute = ({
  component: Component,
  componentProps,
  isAuthenticated,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} {...componentProps} currentUser={user} />
      ) : (
        <Redirecting to="/" />
      )
    }
  />
);

const AdminRoute = ({
  component: Component,
  componentProps,
  isAuthenticated,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated && user.role === "admin" ? (
        <Component {...props} {...componentProps} currentUser={user} />
      ) : (
        <Redirecting to="/" />
      )
    }
  />
);

export { UserRoute, AdminRoute };

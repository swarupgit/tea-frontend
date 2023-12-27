import { string } from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import { PATH_AUTH } from "../../routes/paths";
import { PATH_AFTER_LOGIN } from "../../config-global";
import { token } from "../../store/auth-slice";

const Authenticate = ({ authCheck }) => {
  const location = useLocation();
  const authToken = useSelector(token);
  if (authCheck === "true") {
    return authToken ? (
      <Outlet />
    ) : (
      <Navigate to={PATH_AUTH.login} state={{ from: location }} replace />
    );
  }
  const to = location.state?.from?.pathname
    ? location.state.from.pathname
    : PATH_AFTER_LOGIN;
  return authToken ? <Navigate to={to} replace /> : <Outlet />;
};

Authenticate.propTypes = {
  authCheck: string,
};

export default Authenticate;

import React from "react";
import { UserContext } from "../../UserContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { login, loading } = React.useContext(UserContext);

  React.useEffect(() => {

  }, [loading, login]);

  if (loading === true) return children;
  else if (login === true) return children;
  else if (login === false) {
    return <Navigate to="/login" />;
  } else return <></>;
};

export default ProtectedRoute;

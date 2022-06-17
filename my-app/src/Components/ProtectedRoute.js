import React from "react";
import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import paths from "../constants/Paths";


const ProtectedRoute = ({ children }) => {
  let { user } = useUserAuth();
  const { SIGN_IN_PATH} = paths;
  if (!user) {
    return <Navigate to={`/${SIGN_IN_PATH}`}/>;
  }
  return children;
};

export default ProtectedRoute;

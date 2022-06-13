import React from "react";
import Rolls from "../../constants/Rolls";
import { useUserAuth } from "../../context/UserAuthContext";
import AdminForm from "./AdminForm";
import ClientForm from "./ClientForm";

function GetDone() {
  const { Admin } = Rolls;
  const { roll } = useUserAuth();
  const component = roll === Admin ? <AdminForm /> : <ClientForm />;
  return component;
}

export default GetDone;

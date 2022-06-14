import React, { useState } from "react";
import Rolls from "../../constants/Rolls";
import { useUserAuth } from "../../context/UserAuthContext";
import AdminForm from "./AdminForm";
import ClientForm from "./ClientForm";

function ViewTask({ setIsOpen, data }) {
  const { Admin } = Rolls;
  const { roll } = useUserAuth();
  const component =
    roll === Admin ? (
      <AdminForm data={data} setIsOpen={setIsOpen} />
    ) : (
      <ClientForm data={data} setIsOpen={setIsOpen} />
    );
  return component;
}

export default ViewTask;

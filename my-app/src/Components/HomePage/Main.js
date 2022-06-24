import React, { useState } from "react";
import Rolls from "../../constants/Rolls";
import { useUserAuth } from "../../context/UserAuthContext";
import Form from "./Form";

function ViewTask({ setIsOpen, data }) {
  const component = <Form data={data} setIsOpen={setIsOpen} />;

  return component;
}

export default ViewTask;

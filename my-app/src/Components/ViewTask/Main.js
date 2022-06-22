import React from "react";
import Form from "./Form";

function ViewTask({ setIsOpen, data }) {
  const component = <Form data={data} setIsOpen={setIsOpen} />;

  return component;
}

export default ViewTask;

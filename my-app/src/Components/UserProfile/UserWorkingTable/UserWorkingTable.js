import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { Outlet, Route, Routes } from "react-router-dom";
import ProfileChange from "../../Profile";
import CreateNewTask from "../CreateNewTask/CreateNewTask";



const useStyle = createUseStyles(() => {
  return {
    UserWorkingTable: {
      backgroundColor: "white",
      flex: 1
    },
  };
});

function UserWorkingTable(props) {
  const classes = useStyle();
 
  return (
    <div className={classes.UserWorkingTable} style={{
      flex: props.open ? 4 : 25,
    }}>{props.open}
      {props.component}
    </div>
  );
}
export default UserWorkingTable;

import React from "react";
import { createUseStyles } from "react-jss";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../../context/UserAuthContext";
import { getDatabase, ref, get } from "firebase/database";
import Rolls from "../../../constants/Rolls";
import { AdminTools, ClientTools } from "./GetToolsList";


const useStyle = createUseStyles(() => {
  return {
    usertoolslist: {
      flex: 2,
      display: "flex",
      flexDirection: "column",
    },
    usertoolslistClose: {
      flex: 3,
      display: "flex",
      flexDirection: "column",
    },
    toolsspan: {
      color: "#B4C8EC",
      flex: 5,
    },
  
    div: {
      alignItems: 'center',
      height: '9%',
      display: "flex",
      "&:hover": {
        backgroundColor: "#1264F3",
        // boxShadow: "blue 0 -6px 18px inset",
        // transform: "scale(1.11)",
        cursor: "pointer",
      },
      // "&:active": {
      //   transform: "scale(1.085)",
      // },
    },
  };
});
function ToolsList(props) {
  const navigate = useNavigate();
  const classes = useStyle();
  const { user, roll } = useUserAuth();
  const { open } = props;
  const { Admin } = Rolls;

  const arrTools = roll === Admin ? AdminTools() : ClientTools();

  return (
    <div
      className={open ? classes.usertoolslist : classes.usertoolslistClose}
      style={{
        justifyContent: open ? null : 'center',
        margin: open ? null : 'auto',
      }}
    >
      {arrTools.map((e) => {
        return (
          <div
            className={classes.div}
            onClick={() => navigate(e.path)}
            key={e.id}
          >
            {e.icon}
            {open ? <span className={classes.toolsspan}>{e.text}</span> : null}
          </div>
        );
      })}
    </div>
  );
}
export default ToolsList;

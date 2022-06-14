import React from "react";
import { createUseStyles } from "react-jss";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import {  useUserAuth } from "../../../context/UserAuthContext";
import { getDatabase, ref, get } from "firebase/database";

const useStyle = createUseStyles(() => {
  return {
    usertoolslist: {
      flex: 2,
      display: "flex",
      flexDirection: "column",
      marginLeft: 30,
      // fontSize: 19,
    },
    toolsspan: {
      color: "#B4C8EC",
      verticalAlign: "middle",
      flex: 5,
      marginTop: "5%",
    },
    icon: {
      flex: 1,
      margin: {
        top: "5%",
      },
    },
    div: {
      width: "80%",
      fontSize: "100%",
      display: "flex",
      justifyContent: "center",
      "&:hover": {
        backgroundColor: "#019CAD",
        boxShadow: "#1264F3 0 -6px 8px inset",
        transform: "scale(1.125)",
        cursor: "pointer",
      },
      "&:active": {
        transform: "scale(1.125)",
      },
    },
  };
});
function ToolsList(props) {
  const navigate = useNavigate();
  const classes = useStyle();
  const { user, toolsList } = useUserAuth();
  const  {open} = props;

  const arrTools = toolsList();

  return (
    <div
      className={classes.usertoolslist}
      style={{
        marginLeft: open ? 30 : 15,
        marginTop: open ? null : 40,
      }}
    >
      {arrTools.map((e) => {
        if (e.rull !== "Admin") {
          return (
            <div
              className={classes.div}
              onClick={() => navigate(e.path)}
              key={uuidv4()}
            >
              {e.icon}
              {open ? (
                <span className={classes.toolsspan}>{e.text}</span>
              ) : null}
            </div>
          );
        }
      })}
    </div>
  );
}
export default ToolsList;

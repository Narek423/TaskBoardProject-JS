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
      flex: 3,
      display: "flex",
      flexDirection: "column",
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
      // fontSize: "100%",
      display: "flex",
      "&:hover": {
        backgroundColor: "#1264F3",
        // boxShadow: "#1264F3 0 -6px 8px inset",
        // transform: "scale(1.125)",
        cursor: "pointer",
      },
      // "&:active": {
      //   transform: "scale(1.125)",
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
      className={classes.usertoolslist}
      style={{
        justifyContent: open ? null : 'center',
        margin: open ? null : 'auto',

        // marginLeft: open ? 30 : 15,
        // marginTop: open ? null : 40,
      }}
    >
      {arrTools.map((e) => {
        return (
          <div
            className={classes.div}
            onClick={() => navigate(e.path)}
            key={uuidv4()}
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

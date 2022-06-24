import React, { useEffect, useState } from "react";
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
    selectedToolsspan: {
      color: "#ff9800",
      flex: 5,
    },

    div: {
      alignItems: "center",
      height: "9%",
      display: "flex",
      "&:hover": {
        backgroundColor: "#1264F3",
        cursor: "pointer",
      },
    },
    selectedDiv: {
      alignItems: "center",
      height: "9%",
      display: "flex",
      color: "#ff9800",
      "&:hover": {
        backgroundColor: "#1264F3",
        cursor: "pointer",
      },
    },
  };
});
function ToolsList(props) {
  const navigate = useNavigate();
  const classes = useStyle();
  const [selectedItem, setSelectedItem] = useState(1);
  const { user, roll } = useUserAuth();
  const { open } = props;
  const { Admin } = Rolls;

  const arrTools = roll === Admin ? AdminTools() : ClientTools();

  return (
    <div
      className={open ? classes.usertoolslist : classes.usertoolslistClose}
      style={{
        justifyContent: open ? null : "center",
        margin: open ? null : "auto",
      }}
    >
      {arrTools.map((e) => {
        return (
          <div
            className={
              selectedItem === e.id ? classes.selectedDiv : classes.div
            }
            onClick={() => {
              setSelectedItem(e.id);
              navigate(e.path);
            }}
            key={e.id}
          >
            {e.icon}
            {open ? (
              <span
                className={
                  selectedItem === e.id
                    ? classes.selectedToolsspan
                    : classes.toolsspan
                }
              >
                {e.text}
              </span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
export default ToolsList;

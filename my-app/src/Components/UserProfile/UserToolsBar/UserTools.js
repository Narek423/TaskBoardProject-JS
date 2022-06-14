import React from "react";
import { createUseStyles } from "react-jss";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import LogOutBtn from "./LogOutBtn";
import UserAvatar from "../UserAvatar/UserAvatar";
import UserToolsList from "./UseToolsList";

const useStyle = createUseStyles(() => {
  return {
    UserTools: {
      backgroundImage: "linear-gradient(to top, #1264F3, #019CAD)",
      opacity:  0.8,
      display: "flex",
      flexDirection: "column",
      position: "relative",
      flex: 1,
      width: "100%"
    },
    left: {
        position: "absolute",
        right: 0,
        fontSize: "large",    // class tanuc chap@ chi poxum style mech poxuma ?????
        color: "white",
        cursor: "pointer",

    },
    right: {
        position: "absolute",
            top: 20,
            right: 12,
            fontSize: 30,
            cursor: "pointer"
    }, 
     line: { 
        border: "1px solid #2159B9",
        width: "80%"
       },

  };
});

function UserTools(props) {
  const classes = useStyle();
  const {open,userToolsClose} = props;
  return (
    <div className={classes.UserTools}>
      {open ? (
        <ArrowCircleLeftIcon
          onClick={userToolsClose}
          className={classes.left}
        />
      ) : (
        <ArrowCircleRightIcon
        onClick={userToolsClose}
        className={classes.right}
        />
      )}
      {open ? <UserAvatar /> : null}
      <hr className={classes.line}></hr>
      <UserToolsList open={open} />
      <hr className={classes.line}></hr>
      <LogOutBtn open={open} />
    </div>
  );
}

export default UserTools;

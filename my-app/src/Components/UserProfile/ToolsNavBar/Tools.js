import React from "react";
import { createUseStyles } from "react-jss";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import LogOutBtn from "./LogOutBtn";
import UserAvatar from "../Avatar/Avatar";
import UserToolsList from "./ToolsList";
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
import SwitchRightIcon from '@mui/icons-material/SwitchRight';

const useStyle = createUseStyles(() => {
  return {
    UserTools: {
      backgroundImage: "linear-gradient(to top, #1264F3, #019CAD)",
      // opacity:  0.9,
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
        cursor: "pointer",
        fontSize: 30,
    },
    right: {
        margin: 'auto',
        paddingTop: "10%",
        fontSize: 30,
        cursor: "pointer"
    }, 
     line: { 
        border: "1px solid #2159B9",
        width: "80%"
       },

  };
});

function Tools(props) {
  const classes = useStyle();
  const {open,userToolsClose} = props;
  return (
    <div className={classes.UserTools}>
      {open ? (
        <SwitchRightIcon
          onClick={userToolsClose}
          className={classes.left}
        />
      ) : (
        <SwitchLeftIcon
        onClick={userToolsClose}
        className={classes.right}
        />
      )}
      <UserAvatar open={open}/> 
      <hr className={classes.line}></hr>
      <UserToolsList open={open} />
      <hr className={classes.line}></hr>
      <LogOutBtn open={open} />
    </div>
  );
}

export default Tools;

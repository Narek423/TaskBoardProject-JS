import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { createUseStyles } from "react-jss";

const useStyle = createUseStyles(() => {
  return {
    LogoutIcon: {
      flex: 2,
      textAlign: "center",
      position: "relative",
    },
  };
});
function LogOutBtn(props) {
  
  const classes = useStyle();

  return (
    <div className={classes.LogoutIcon}>
      <LogoutIcon
        onClick={() => "logOut()"}
        style={{
          fontSize: 30,
          color: "#B4C8EC",
          position: "absolute",
          bottom: 20,
          right: props.open ? null : 10,
          cursor: "pointer"
        }}
      />
    </div>
  );
}

export default LogOutBtn;

import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { createUseStyles } from "react-jss";
import { Logout } from "@mui/icons-material";
import { useUserAuth } from "../../../context/UserAuthContext";

const useStyle = createUseStyles(() => {
  return {
    LogoutIcon: {
      flex: 1,
      textAlign: "center",
      position: "relative",
    },
  };
});
function LogOutBtn(props) {
  const { logOut } = useUserAuth();
  const classes = useStyle();
  const { open } = props;

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className={classes.LogoutIcon}>
      <LogoutIcon
        onClick={handleLogOut}
        style={{
          fontSize: 30,
          color: "#B4C8EC",
          position: "absolute",
          bottom: 20,
          right: open ? null : 10,
          cursor: "pointer",
        }}
      />
    </div>
  );
}

export default LogOutBtn;

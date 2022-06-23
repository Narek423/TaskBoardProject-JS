import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { createUseStyles } from "react-jss";
import { Logout } from "@mui/icons-material";
import { useUserAuth } from "../../../context/UserAuthContext";

const useStyle = createUseStyles(() => {
  return {
    LogoutIcon: {
      flex: 1,
      margin: "auto",
    },
    logOutIconClose: {
      flex: 5,
      position: "relative",
    },
    iconBtnClose: {
      cursor: "pointer",
    },
    iconBtn: {
      position: "absolute",
      bottom: "2%",
      cursor: "pointer",
    },
    block: {
      position: 'absolute',
      bottom: "2%",
      textAlign: 'center'
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
    <div className={open ? classes.LogoutIcon : classes.logOutIconClose}>
      <div className={open ? null : classes.block}>
        <LogoutIcon
          onClick={handleLogOut}
          className={open ? classes.iconBtn : classes.iconBtnClose}
        />
      </div>
    </div>
  );
}

export default LogOutBtn;

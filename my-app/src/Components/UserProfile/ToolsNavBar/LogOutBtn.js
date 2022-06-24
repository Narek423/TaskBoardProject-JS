import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { createUseStyles } from "react-jss";
import { useUserAuth } from "../../../context/UserAuthContext";

const useStyle = createUseStyles(() => {
  return {
    LogoutIcon: {
      flex: 1,
      margin: "auto",
    },
    logOutIconClose: {
      flex: 5,
      textAlign: "center",
    },
    iconBtnClose: {
      cursor: "pointer",
    },
    iconBtn: {
      textAlign: "center",
      cursor: "pointer",
    },
    block: {
      position: "absolute",
      bottom: "2%",
      alignItems: "center",
      display: "flex",
    },
    blockClose: {
      position: "absolute",
      bottom: "2%",
      width: "100%",
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
      <div className={open ? classes.block : classes.blockClose}>
        <LogoutIcon
          onClick={handleLogOut}
          className={open ? classes.iconBtn : classes.iconBtnClose}
        />
      </div>
    </div>
  );
}

export default LogOutBtn;

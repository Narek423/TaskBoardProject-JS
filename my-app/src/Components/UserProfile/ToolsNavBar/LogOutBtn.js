import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { createUseStyles } from "react-jss";
import { Logout } from "@mui/icons-material";
import { useUserAuth } from "../../../context/UserAuthContext";

const useStyle = createUseStyles(() => {
  return {
    LogoutIcon: {
      flex: 1,
      margin: 'auto',
      // position: "relative",
    },
    logOutIconClose: {
      flex: 5,
      position: 'relative'
    },
    iconBtnClose: {
      marginLeft: '30%', ////esi chi @nlum mechtex qcelu pah@
      position: 'absolute',
      bottom: "2%",
      cursor: "pointer",
    },
    iconBtn: {
      position: 'absolute',
      bottom: '2%',
    }
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
      <LogoutIcon
        onClick={handleLogOut}
        className={open ? classes.iconBtn : classes.iconBtnClose}
      />
    </div>
  );
}

export default LogOutBtn;

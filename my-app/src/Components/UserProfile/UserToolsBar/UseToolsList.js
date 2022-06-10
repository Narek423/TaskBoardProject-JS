import React, { useEffect, useMemo, useState } from "react";
import { createUseStyles } from "react-jss";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TaskIcon from "@mui/icons-material/Task";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import AddTaskIcon from "@mui/icons-material/AddTask";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import EditIcon from "@mui/icons-material/Edit";
import PaymentIcon from "@mui/icons-material/Payment";
import MailIcon from "@mui/icons-material/Mail";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { UserAuthContext, useUserAuth } from "../../../context/UserAuthContext";
import { getDatabase, ref, get } from "firebase/database";
import paths from "../../constants/Paths";

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
function UserToolsList(props) {
  const navigate = useNavigate();
  const classes = useStyle();
  const { user, toolsList } = useUserAuth();
  // // const clientId = user.uid;
  // const dbRef = getDatabase();
  // const [rull, setRull] = useState();

  // let clientData = {};
  // get(ref(dbRef, "users/" + clientId))
  //   .then((snapshot) => {
  //     clientData = snapshot.val();
  //     setRull(clientData.roll);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

  const arrTools = toolsList();

  return (
    <div
      className={classes.usertoolslist}
      style={{
        marginLeft: props.open ? 30 : 15,
        marginTop: props.open ? null : 40,
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
              {props.open ? (
                <span className={classes.toolsspan}>{e.text}</span>
              ) : null}
            </div>
          );
        }
      })}
    </div>
  );
}
export default UserToolsList;

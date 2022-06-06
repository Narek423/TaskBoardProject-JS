import React, { useState } from "react";
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

const useStyle = createUseStyles(() => {
  return {
    usetoolslist: {
      flex: 2,
      display: "flex",
      flexDirection: "column",
      marginLeft: 30,
      // fontSize: 19,
    },
    toolsspan: {
      color: "#B4C8EC",
      verticalAlign: "middle",
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
  const { user } = useUserAuth(UserAuthContext);
  const clientId = user.uid;
  const dbRef = getDatabase();

  let clientData = {};
  get(ref(dbRef, "users/" + clientId))
    .then((snapshot) => {
      if (snapshot.exists()) {
        clientData = snapshot.val();
      }
    })
    .catch((error) => {
      console.error(error);
    });
  const rull = clientData.rull;

  const arrTools = [
    {
      icon: <AssignmentIndIcon className={classes.icon} />,
      text: "Profile",
      path: "profile/Div",
      id: 1,
    },
    {
      icon: <AssignmentIcon className={classes.icon} />,
      text: "All Tasks",
      id: 2,
      path:
        rull === "admin"
          ? "/profile/admin/alltasks/"
          : "/profile/client/alltasks/",
    },
    {
      icon: <PublishedWithChangesIcon className={classes.icon} />,
      text: "Evaluation Tasks",
      id: 3,
      path:
        rull === "admin"
          ? "/profile/admin/evaluationtasks/"
          : "/profile/client/evaluationtasks/",
    },
    {
      icon: <TaskIcon className={classes.icon} />,
      text: "Acception Tasks",
      id: 4,
      path:
        rull === "admin"
          ? "/profile/admin/acceptiontasks/"
          : "/profile/client/acceptiontasks/",
    },
    {
      icon: <AssignmentLateIcon className={classes.icon} />,
      text: "In Progress Tasks Tasks",
      id: 5,
      path:
        rull === "admin"
          ? "/profile/admin/inprogresstasks/"
          : "/profile/client/inprogresstasks/",
    },
    {
      icon: <AssignmentIcon className={classes.icon} />,
      text: "Done Tasks Admin",
      id: 6,
      path:
        rull === "admin"
          ? "/profile/admin/donetasks/"
          : "/profile/client/donetasks/",
    },
    {
      icon: <AssignmentIcon className={classes.icon} />,
      text: "Rejected tasks Admin",
      id: 7,
      path:
        rull === "admin"
          ? "/profile/admin/rejectedtasks/"
          : "/profile/client/rejectedtasks/",
    },
    {
      icon: <EditIcon className={classes.icon} />,
      text: "Create Task",
      path: "/",
      id: 8,
    },
    {
      icon: <EqualizerIcon className={classes.icon} />,
      text: "Statics",
      path: "/",
      id: 9,
    },
    {
      icon: <PaymentIcon className={classes.icon} />,
      text: "Payment History",
      path: "Profile",
      id: 10,
    },
    {
      icon: <MailIcon className={classes.icon} />,
      text: "Inbox",
      id: 11,
      path: "Profile",
    },
  ];

  // const [arrTools, setToolsData] = useState(arr);

  return (
    <div
      className={classes.usetoolslist}
      style={{
        marginLeft: props.open ? 30 : 15,
        marginTop: props.open ? null : 40,
      }}
    >
      {arrTools.map((e) => {
        return (
          <div
            className={classes.div}
            onClick={() => navigate(e.path)}
            // onMouseOver={() => onMouseOver(e.text)}
            key={uuidv4()}
          >
            {e.icon}
            {props.open ? (
              <span
                style={{
                  flex: 5,
                  marginTop: "5%",
                }}
                className={classes.toolsspan}
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
export default UserToolsList;

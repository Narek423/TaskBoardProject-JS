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

  const arrTools = [
    {
      icon: <AssignmentIndIcon className={classes.icon} />,
      text: "Profile",
      link: "/",
      path: "profile/Div",
      id: 1,
    },
    {
      icon: <AssignmentIcon className={classes.icon} />,
      text: "All Tasks Admin",
      link: "/",
      id: 2,
      path: "/profile/admin/alltasks/",
    },
    {
      icon: <AssignmentIcon className={classes.icon} />,
      text: "All Tasks client",
      id: 2,
      path: "/profile/client/alltasks/",
    },
    {
      icon: <AssignmentIcon className={classes.icon} />,
      text: "Done Tasks Admin",
      link: "/",
      id: 2,
      path: "/profile/admin/donetasks/",
    },
    {
      icon: <AssignmentIcon className={classes.icon} />,
      text: "Done Tasks client",
      id: 2,
      path: "/profile/client/donetasks/",
    },
    {
      icon: <AssignmentIcon className={classes.icon} />,
      text: "Rejected tasks Admin",
      link: "/",
      id: 2,
      path: "/profile/admin/rejectedtasks/",
    },
    {
      icon: <AssignmentIcon className={classes.icon} />,
      text: "Rejected tasks client",
      id: 2,
      path: "/profile/client/rejectedtasks/",
    },
    {
      icon: <PublishedWithChangesIcon className={classes.icon} />,
      text: "Inprocess Tasks",
      id: 3,
      path: "/profile/admin/evaluationtasks/",
    },
    {
      icon: <AddTaskIcon className={classes.icon} />,
      text: "Active Tasks",
      id: 4,
      path: "/profile/client/evaluationtasks/",
    },
    {
      icon: <TaskIcon className={classes.icon} />,
      text: "Done Tasks",
      path: "/profile/admin/acceptiontasks/",
      id: 5,
    },
    {
      icon: <EditIcon className={classes.icon} />,
      text: "Create Task",
      path: "/profile/client/acceptiontasks/",
      id: 6,
    },
    {
      icon: <AssignmentLateIcon className={classes.icon} />,
      text: "Rejected Tasks",
      path: "/profile/admin/inprogresstasks/",
      id: 7,
    },
    {
      icon: <EqualizerIcon className={classes.icon} />,
      text: "Statics",
      link: "/",
      path: "/profile/client/inprogresstasks/",
      id: 8,
    },
    {
      icon: <PaymentIcon className={classes.icon} />,
      text: "Payment History",
      link: "/",
      path: "Profile",
      id: 9,
    },
    {
      icon: <MailIcon className={classes.icon} />,
      text: "Inbox",
      id: 10,
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

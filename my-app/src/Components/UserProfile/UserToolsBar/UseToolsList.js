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
      path: "profile/Div",
      id: 1,
    },
    {
      icon: <AssignmentIcon className={classes.icon} />,
      text: "All Tasks",
      id: 2,
      path: "AllTasks",
    },
    {
      icon: <PublishedWithChangesIcon className={classes.icon} />,
      text: "Inprocess Tasks",
      id: 3,
      path: "InprocessTasks",
    },
    {
      icon: <AddTaskIcon className={classes.icon} />,
      text: "Active Tasks",
      id: 4,
      path: "ActiveTasks",
    },
    {
      icon: <TaskIcon className={classes.icon} />,
      text: "Done Tasks",
      path: "DoneTasks",
      id: 5,
    },
    {
      icon: <EditIcon className={classes.icon} />,
      text: "Create Task",
      path: "/userProfile",
      id: 6,
    },
    {
      icon: <AssignmentLateIcon className={classes.icon} />,
      text: "Rejected Tasks",
      path: "RejectedTasks",
      id: 7,
    },
    {
      icon: <EqualizerIcon className={classes.icon} />,
      text: "Statics",
      path: "Profile",
      id: 8,
    },
    {
      icon: <PaymentIcon className={classes.icon} />,
      text: "Payment History",
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
            onClick={(() => navigate(e.path))}
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

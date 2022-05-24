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
import { v4 as uuidv4 } from "uuid";

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
  };
});
function UserToolsList(props) {
  const classes = useStyle();

  const arrTools = [
    {
      icon: <AssignmentIndIcon className={classes.icon} />,
      text: "Profile",
      id: uuidv4(),
    },
    {
      icon: <AssignmentIcon className={classes.icon} />,
      text: "All Tasks",
      id: uuidv4(),
    },
    {
      icon: <PublishedWithChangesIcon className={classes.icon} />,
      text: "Inprocess Tasks",
      id: uuidv4(),
    },
    {
      icon: <AddTaskIcon className={classes.icon} />,
      text: "Active Tasks",
      id: uuidv4(),
    },
    {
      icon: <TaskIcon className={classes.icon} />,
      text: "Done Tasks",
      id: uuidv4(),
    },
    {
      icon: <EditIcon className={classes.icon} />,
      text: "Create Task",
      id: uuidv4(),
    },
    {
      icon: <AssignmentLateIcon className={classes.icon} />,
      text: "Rejected Tasks",
      id: uuidv4(),
    },
    {
      icon: <EqualizerIcon className={classes.icon} />,
      text: "Statics",
      id: uuidv4(),
    },
    {
      icon: <PaymentIcon className={classes.icon} />,
      text: "Payment History",
      id: uuidv4(),
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
            style={{
              width: "80%",
              fontSize: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            onClick={() => alert(e.text)}
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

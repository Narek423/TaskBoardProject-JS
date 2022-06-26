import React from "react";
import { createUseStyles } from "react-jss";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TaskIcon from "@mui/icons-material/Task";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import Cancel from "@mui/icons-material/Cancel";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import EditIcon from "@mui/icons-material/Edit";
import MailIcon from "@mui/icons-material/Mail";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import paths from "../../../constants/Paths";

const {
  PROFILE_PATH,
  INBOX_PATH,
  ACCEPTION_TASKS_PATH,
  ALL_TASKS_PATH,
  CREATE_TASK_PATH,
  EVALUATION_TASKS_PATH,
  REJECTED_TASKS_PATH,
  IN_PROCCESS_TASKS_PATH,
  DONE_TASKS_PATH,
  ADMIN_USER_REQUESTS_PATH,
} = paths;

const useStyle = createUseStyles(() => {
  return {
    icon: {
      flex: 1,
    },
  };
});

export function AdminTools() {
  const classes = useStyle();
  return [
    {
      icon: <AssignmentIndIcon className={classes.icon} />,
      text: "Profile",
      path: PROFILE_PATH,
      id: 1,
    },
    {
      icon: <EqualizerIcon className={classes.icon} />,
      text: "All Tasks",
      id: 2,
      path: ALL_TASKS_PATH,
    },
    {
      icon: <PublishedWithChangesIcon className={classes.icon} />,
      text: "Evaluation Tasks",
      id: 3,
      path: EVALUATION_TASKS_PATH,
    },
    {
      icon: <TaskIcon className={classes.icon} />,
      text: "Acception Tasks",
      id: 4,
      path: ACCEPTION_TASKS_PATH,
    },
    {
      icon: <AssignmentLateIcon className={classes.icon} />,
      text: "In Progress Tasks ",
      id: 5,
      path: IN_PROCCESS_TASKS_PATH,
    },
    {
      icon: <AssignmentIcon className={classes.icon} />,
      text: "Done Tasks",
      id: 6,
      path: DONE_TASKS_PATH,
    },
    {
      icon: <Cancel className={classes.icon} />,
      text: "Rejected tasks",
      id: 7,
      path: REJECTED_TASKS_PATH,
    },
    {
      icon: <NewReleasesIcon className={classes.icon} />,
      text: "Requests",
      id: 8,
      path: ADMIN_USER_REQUESTS_PATH,
    },
    {
      icon: <MailIcon className={classes.icon} />,
      text: "Inbox",
      id: 9,
      path: INBOX_PATH,
    },
  ];
}

export function ClientTools() {
  const classes = useStyle();
  return [
    {
      icon: <AssignmentIndIcon className={classes.icon} />,
      text: "Profile",
      path: PROFILE_PATH,
      id: 1,
    },
    {
      icon: <EqualizerIcon className={classes.icon} />,
      text: "All Tasks",
      id: 2,
      path: ALL_TASKS_PATH,
    },
    {
      icon: <PublishedWithChangesIcon className={classes.icon} />,
      text: "Evaluation Tasks",
      id: 3,
      path: EVALUATION_TASKS_PATH,
    },
    {
      icon: <TaskIcon className={classes.icon} />,
      text: "Acception Tasks",
      id: 4,
      path: ACCEPTION_TASKS_PATH,
    },
    {
      icon: <AssignmentLateIcon className={classes.icon} />,
      text: "In Progress Tasks",
      id: 5,
      path: IN_PROCCESS_TASKS_PATH,
    },
    {
      icon: <AssignmentIcon className={classes.icon} />,
      text: "Done Tasks",
      id: 6,
      path: DONE_TASKS_PATH,
    },
    {
      icon: <Cancel className={classes.icon} />,
      text: "Rejected tasks",
      id: 7,
      path: REJECTED_TASKS_PATH,
    },
    {
      icon: <EditIcon className={classes.icon} />,
      text: "Create Task",
      path: CREATE_TASK_PATH,
      id: 8,
    },
    {
      icon: <MailIcon className={classes.icon} />,
      text: "Inbox",
      id: 9,
      path: INBOX_PATH,
    },
  ];
}

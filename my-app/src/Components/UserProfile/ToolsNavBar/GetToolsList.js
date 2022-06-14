import React from "react";
import { createUseStyles } from "react-jss";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TaskIcon from "@mui/icons-material/Task";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import EditIcon from "@mui/icons-material/Edit";
import MailIcon from "@mui/icons-material/Mail";
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
    STATICS_PATH
  } = paths;


const useStyle = createUseStyles(() => {
    return {
        icon: {
			flex: 1,
			margin: {
				top: "5%",
			},
		},
    }
})

export function ArrAdminTools(){
    const classes = useStyle();
    return [
        {
            icon: <AssignmentIndIcon className={classes.icon} />,
            text: "Profile",
            path: "",
            id: 1,
            
        },
        {
            icon: <AssignmentIcon className={classes.icon} />,
            text: "All Tasks",
            id: 2,
            path: ALL_TASKS_PATH
        },
        {
            icon: <PublishedWithChangesIcon className={classes.icon} />,
            text: "Evaluation Tasks",
            id: 3,
            path: EVALUATION_TASKS_PATH
        },
        {
            icon: <TaskIcon className={classes.icon} />,
            text: "Acception Tasks",
            id: 4,
            path: ACCEPTION_TASKS_PATH
                
        },
        {
            icon: <AssignmentLateIcon className={classes.icon} />,
            text: "In Progress Tasks ",
            id: 5,
            path: IN_PROCCESS_TASKS_PATH
        },
        {
            icon: <AssignmentIcon className={classes.icon} />,
            text: "Done Tasks Admin",
            id: 6,
            path: DONE_TASKS_PATH
        },
        {
            icon: <AssignmentIcon className={classes.icon} />,
            text: "Rejected tasks Admin",
            id: 7,
            path: REJECTED_TASKS_PATH
        },
        {
            icon: <EqualizerIcon className={classes.icon} />,
            text: "Statics",
            path: STATICS_PATH,
            id: 9,
        },
        // {
        //     icon: <PaymentIcon className={classes.icon} />,
        //     text: "Payment History",
        //     path: "Profile",
        //     id: 10,
        // },
        {
            icon: <MailIcon className={classes.icon} />,
            text: "Inbox",
            id: 11,
            path: INBOX_PATH,
        },
    ];
}

export function ArrClientTools(){
    const classes = useStyle();
    return [
        {
            icon: <AssignmentIndIcon className={classes.icon} />,
            text: "Profile",
            path: "",
            id: 1,
            
        },
        {
            icon: <AssignmentIcon className={classes.icon} />,
            text: "All Tasks",
            id: 2,
            path: ALL_TASKS_PATH
        },
        {
            icon: <PublishedWithChangesIcon className={classes.icon} />,
            text: "Evaluation Tasks",
            id: 3,
            path: EVALUATION_TASKS_PATH
        },
        {
            icon: <TaskIcon className={classes.icon} />,
            text: "Acception Tasks",
            id: 4,
            path: ACCEPTION_TASKS_PATH
                
        },
        {
            icon: <AssignmentLateIcon className={classes.icon} />,
            text: "In Progress Tasks ",
            id: 5,
            path: IN_PROCCESS_TASKS_PATH
        },
        {
            icon: <AssignmentIcon className={classes.icon} />,
            text: "Done Tasks Admin",
            id: 6,
            path: DONE_TASKS_PATH
        },
        {
            icon: <AssignmentIcon className={classes.icon} />,
            text: "Rejected tasks Admin",
            id: 7,
            path: REJECTED_TASKS_PATH
        },
        {
            icon: <EditIcon className={classes.icon} />,
            text: "Create Task",
            path: CREATE_TASK_PATH,
            id: 8,
        },
        {
            icon: <EqualizerIcon className={classes.icon} />,
            text: "Statics",
            path: "/",
            id: 9,
        },
        // {
        //     icon: <PaymentIcon className={classes.icon} />,
        //     text: "Payment History",
        //     path: "Profile",
        //     id: 10,
        // },
        {
            icon: <MailIcon className={classes.icon} />,
            text: "Inbox",
            id: 11,
            path: INBOX_PATH,
        },
    ];
}


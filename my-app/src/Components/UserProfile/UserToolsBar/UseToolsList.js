import React, { useEffect, useState } from "react";
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
	const [rull, setRull] = useState(); // ste pti chlni

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
	  } = paths;

	  useEffect(() => {   //ste pti chlni
		get(ref(dbRef, "users/" + user.uid))
		.then((snapshot) => {
		  setRull(snapshot.val().roll);
		  console.log("our console", rull);
		})
		.catch((error) => {
		  console.error(error);
		});
	  })

	const arrTools = [
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
			text: "In Progress Tasks Tasks",
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
			rull // stugum enq admina te che
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
			path: INBOX_PATH,
		},
	];

	// const [arrTools, setToolsData] = useState(arr);

	return (
		<div
			className={classes.usertoolslist}
			style={{
				marginLeft: props.open ? 30 : 15,
				marginTop: props.open ? null : 40,
			}}
		>
			{arrTools.map((e) => {
				if(e.rull !== "Admin") {
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
				}
			})}
		</div>
	);
}
export default UserToolsList;

import React, { useCallback, useContext, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserAuthContext, useUserAuth } from "../../context/UserAuthContext";
import CreateNewTask from "./CreateNewTask/CreateNewTask";
import Inbox from "./Inbox/Inbox";
import ProfilePage from "./ProfilePage/ProfilePage";
import UserTools from "./UserToolsBar/UserTools";
import UserWorkingTable from "./UserWorkingTable/UserWorkingTable";

const useStyle = createUseStyles(() => {
  return {
    UserProfile: {
      display: "flex",
      height: "100vh"
    },
  };
});

function UserProfile({children}) {
	const { user } = useUserAuth(UserAuthContext);
	const classes = useStyle();
	const [toolsBarOpen, setToolsBaropen] = useState(true);
	const navigate = useNavigate()

	const userToolsClose = useCallback(() => {
		setToolsBaropen(!toolsBarOpen);
	});

	// const userNavig = (path) => {
	// 	navigate(path)
	// }


	
	return (
		<div className={classes.UserProfile}>
			<UserTools open={toolsBarOpen} userToolsClose={userToolsClose} />
			<Routes>
				<Route  path="/" element={<UserWorkingTable open={toolsBarOpen} component={<ProfilePage />}></UserWorkingTable>} />
				<Route path="inbox/*" element={<UserWorkingTable open={toolsBarOpen} component={<Inbox />}></UserWorkingTable>} />
				<Route path="createTask" element={<UserWorkingTable open={toolsBarOpen} component={<CreateNewTask />}></UserWorkingTable>} />
			</Routes>
		</div>
	);
}

export default UserProfile;

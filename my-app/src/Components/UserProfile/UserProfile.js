import React, { useCallback, useContext, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import { UserAuthContext, useUserAuth } from "../../context/UserAuthContext";
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
			<UserWorkingTable open={toolsBarOpen}>{children}</UserWorkingTable>
		</div>
	);
}

export default UserProfile;

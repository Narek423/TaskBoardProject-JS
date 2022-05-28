import React, { useCallback, useState } from "react";
import { createUseStyles } from "react-jss";
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

function UserProfile() {
  const classes = useStyle();
  const [toolsBarOpen,setToolsBaropen] = useState(true);

  const userToolsClose = useCallback(() => {
      setToolsBaropen(!toolsBarOpen)
  })

  return (
    <div className={classes.UserProfile}>
      <UserTools open={toolsBarOpen} userToolsClose={userToolsClose} />
      <UserWorkingTable open={toolsBarOpen} />
    </div>
  );
}

export default UserProfile;
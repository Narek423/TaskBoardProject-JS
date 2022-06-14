import React from "react";
import { createUseStyles } from "react-jss";


const useStyle = createUseStyles(() => {
  return {
    UserWorkingTable: {
      backgroundColor: "white",
      flex: 1
    },
  };
});

function UserWorkingTable(props) {
  const { open,component } = props
  const classes = useStyle();
 
  return (
    <div className={classes.UserWorkingTable} style={{
      flex: open ? 4 : 25,
    }}>{open}
      {component}
    </div>
  );
}
export default UserWorkingTable;

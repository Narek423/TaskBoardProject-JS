import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from "@mui/system";
import CreateNewTask from "../CreateNewTask/CreateNewTask";


const useStyle = createUseStyles(() => {
  return {
    UserWorkingTable: {
      backgroundColor: "white",
      flex: 1
    },
  };
});

function UserWorkingTable(props) {
  const [age,setAge] = useState('age')
  const classes = useStyle();
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const roll = ""
  return (
    <div className={classes.UserWorkingTable} style={{
      flex: props.open ? 4 : 25,
    }}>{props.open}
     	<CreateNewTask />
    </div>
  );
}
export default UserWorkingTable;

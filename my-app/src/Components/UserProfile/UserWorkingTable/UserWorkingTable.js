import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from "@mui/system";

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
     	<FormControl 
					className={classes.fields} 
					sx={{ m: 1, width: "25ch" }}
					>
						<InputLabel id="demo-simple-select-label">Roll</InputLabel>
						<Select
							labelId='inputRollId'
							id='RollId'
							value={roll}
							label="Roll"
							// onChange={(e) => {
							// 	setRoll(e.target.value);
							// 	setEnabled(e.target.value === "Admin" ? false : true);
							// }}
						>
							<MenuItem value={"Client"}>Client</MenuItem>
							<MenuItem value={"Admin"}>Admin</MenuItem>

						</Select>
					</FormControl>
          <FormControl 
					className={classes.fields} 
					sx={{ m: 1, width: "25ch" }}
					>
						<InputLabel id='inputRollId'>Roll</InputLabel>
						<Select
							labelId='inputRollId'
							id='RollId'
							value={roll}
							label='Roll'
							// onChange={(e) => {
							// 	setRoll(e.target.value);
							// 	setEnabled(e.target.value === "Admin" ? false : true);
							// }}
						>
							<MenuItem value={"Client"}>Client</MenuItem>
							<MenuItem value={"Admin"}>Admin</MenuItem>

						</Select>
					</FormControl>
    </div>
  );
}
export default UserWorkingTable;

import React from "react";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";


function CreateNewTask() {
  return (
      <div style={{
          position: 'fixed',
          bottom: 20,
          right: 80
      }}>
    <Fab  color="primary" aria-label="edit">
      <EditIcon />
    </Fab>
    </div>
  )
}

export default CreateNewTask;

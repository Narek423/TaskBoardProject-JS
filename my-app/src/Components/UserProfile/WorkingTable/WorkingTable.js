import React from "react";
import { createUseStyles } from "react-jss";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import paths from "../../../constants/Paths";
import { useUserAuth } from "../../../context/UserAuthContext";
import Rolls from "../../../constants/Rolls";

const useStyle = createUseStyles(() => {
  return {
    UserWorkingTable: {
      backgroundColor: "white",
      flex: 1,
    },
  };
});

function WorkingTable(props) {
  const { open, component, create } = props;
  const classes = useStyle();
  const { roll } = useUserAuth();
  const navigate = useNavigate();
  const { CREATE_TASK_PATH, USER_PROFILE_PATH } = paths;
  const { Admin } = Rolls;

  return (
    <div
      className={classes.UserWorkingTable}
      style={{
        flex: open ? 4 : 25,
      }}
    >
      {component}
      {!create && roll !== Admin ? (
        <Fab
          color="primary"
          aria-label="edit"
          style={{
            position: "fixed",
            bottom: 10,
            right: 10,
          }}
          onClick={() => navigate(`/${USER_PROFILE_PATH}/${CREATE_TASK_PATH}`)}
        >
          <EditIcon />
        </Fab>
      ) : null}
    </div>
  );
}
export default WorkingTable;

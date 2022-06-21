import React, { useCallback, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { Route, Routes, useNavigate } from "react-router-dom";
import {  useUserAuth } from "../../context/UserAuthContext";
import CreateNewTask from "./CreateNewTask/CreateNewTask";
import Inbox from "./Inbox/Inbox";
import UserTools from "./ToolsNavBar/Tools";
import UserWorkingTable from "./WorkingTable/WorkingTable";
import Statics from "./statics/Statics";
import paths from "../../constants/Paths";
import GetProfile from "./ProfilePage/Main";
import GetEvaluation from "../Evaluation/Main";
import GetAcception from "../Acception/Main";
import GetInProgress from "../InProgress/Main";
import GetDone from "../Done/Main";
import GetRejected from "../Rejected/Main";
import GetAllTasks from "../AllTasks/Main";
import Rolls from "../../constants/Rolls";
import GetProfileForm from "../ProfileForm/Main";
import { getDatabase } from "firebase/database";
import ApprovingAdminProfile from "../AdminUserRequests/Form";

const useStyle = createUseStyles(() => {
  return {
    UserProfile: {
      display: "flex",
      height: "100vh",
    },
  };
});

function UserProfile({ children }) {
  const { user, roll } = useUserAuth();
  const classes = useStyle();
  const [toolsBarOpen, setToolsBaropen] = useState(true);
  const dbRef = getDatabase();
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
    STATICS_PATH,
    ADMIN_USER_REQUESTS_PATH
  } = paths;

  const userToolsClose = useCallback(() => {
    setToolsBaropen(!toolsBarOpen);
  });

  const { Admin } = Rolls;

  return (
    <div className={classes.UserProfile}>
      <UserTools open={toolsBarOpen} userToolsClose={userToolsClose} />
      <Routes>
        <Route
          path={`${INBOX_PATH}/*`}
          element={
            roll === Admin ? (
              <UserWorkingTable open={toolsBarOpen} component={<Inbox />} />
            ) : (
              <UserWorkingTable open={toolsBarOpen} component={<Inbox />} />
            )
          }
        />
        <Route
          path={PROFILE_PATH}
          element={
            <UserWorkingTable
              open={toolsBarOpen}
              component={GetProfileForm()}
            />
          }
        />
         <Route
          path={ADMIN_USER_REQUESTS_PATH}
          element={
            <UserWorkingTable
              open={toolsBarOpen}
              component={<ApprovingAdminProfile />}
            />
          }
        />
        
        <Route
          path={CREATE_TASK_PATH}
          element={
            <UserWorkingTable
              open={toolsBarOpen}
              component={<CreateNewTask />}
            />
          }
        />
        <Route
          path={ALL_TASKS_PATH}
          element={
            <UserWorkingTable open={toolsBarOpen} component={GetAllTasks()} />
          }
        />
        <Route
          path={EVALUATION_TASKS_PATH}
          element={
            <UserWorkingTable open={toolsBarOpen} component={GetEvaluation()} />
          }
        />
        <Route
          path={ACCEPTION_TASKS_PATH}
          element={
            <UserWorkingTable open={toolsBarOpen} component={GetAcception()} />
          }
        />
        <Route
          path={IN_PROCCESS_TASKS_PATH}
          element={
            <UserWorkingTable open={toolsBarOpen} component={GetInProgress()} />
          }
        />
        <Route
          path={DONE_TASKS_PATH}
          element={
            <UserWorkingTable open={toolsBarOpen} component={GetDone()} />
          }
        />
        <Route
          path={REJECTED_TASKS_PATH}
          element={
            <UserWorkingTable open={toolsBarOpen} component={GetRejected()} />
          }
        />
        {/* <Route
          path={PROFILE_PATH}
          element={
            roll === Admin ? (
              <UserWorkingTable
                open={toolsBarOpen}
                component={<ProfilePage />}
              />
            ) : (
              <UserWorkingTable
                open={toolsBarOpen}
                component={<ProfilePage />}
              />
            )
          }
        />
        <Route
          path={ALL_TASKS_PATH}
          element={
            roll === "Admin" ? (
              <UserWorkingTable
                open={toolsBarOpen}
                component={<AllTasksAdmin />}
              />
            ) : (
              <UserWorkingTable open={toolsBarOpen} component={<AllTasks />} />
            )
          }
        />
        <Route
          path={ACCEPTION_TASKS_PATH}
          element={
            roll === "Admin" ? (
              <UserWorkingTable
                open={toolsBarOpen}
                component={<PendingToAcceptionAdmin />}
              />
            ) : (
              <UserWorkingTable
                open={toolsBarOpen}
                component={<PendingToAcception />}
              />
            )
          }
        /> 
         <Route
          path={EVALUATION_TASKS_PATH}
          element={
            roll === "Admin" ? (
              <UserWorkingTable
                open={toolsBarOpen}
                component={<PendingToEvaluationAdmin />}
              />
            ) : (
              <UserWorkingTable
                open={toolsBarOpen}
                component={<PendingToEvaluation />}
              />
            )
          }
        />
        <Route
          path={REJECTED_TASKS_PATH}
          element={
            roll === "Admin" ? (
              <UserWorkingTable
                open={toolsBarOpen}
                component={<RejectedTasksAdmin />}
              />
            ) : (
              <UserWorkingTable
                open={toolsBarOpen}
                component={<RejectedTasks />}
              />
            )
          }
        />
        <Route
          path={IN_PROCCESS_TASKS_PATH}
          element={
            roll === "Admin" ? (
              <UserWorkingTable
                open={toolsBarOpen}
                component={<InProgressTasksAdmin />}
              />
            ) : (
              <UserWorkingTable
                open={toolsBarOpen}
                component={<InProgressTasks />}
              />
            )
          }
        />
        <Route
          path={DONE_TASKS_PATH}
          element={
            roll === "Admin" ? (
              <UserWorkingTable
                open={toolsBarOpen}
                component={<DoneTasksAdmin />}
              />
            ) : (
              <UserWorkingTable open={toolsBarOpen} component={<DoneTasks />} />
            )
          }
          */}

        <Route
          path={STATICS_PATH}
          element={
            roll === Admin ? (
              <UserWorkingTable open={toolsBarOpen} component={<Statics />} />
            ) : (
              <UserWorkingTable open={toolsBarOpen} component={<Statics />} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default UserProfile;

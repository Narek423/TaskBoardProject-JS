import React, { useCallback, useContext, useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserAuthContext, useUserAuth } from "../../context/UserAuthContext";
import PendingToAcception from "../AcceptionFormClient";
import AllTasks from "../AllTasksClient";
import CreateNewTask from "./CreateNewTask/CreateNewTask";
import Inbox from "./Inbox/Inbox";
import ProfilePage from "./ProfilePage/ProfilePage";
import UserTools from "./UserToolsBar/UserTools";
import UserWorkingTable from "./UserWorkingTable/UserWorkingTable";
import paths from "../constants/Paths";
import PendingToEvaluation from "../EvaluationFormClient";
import RejectedTasks from "../RejectedFormClient";
import InProgressTasks from "../InProgressFormClient";
import DoneTasks from "../DoneFormClient";
import { getDatabase, ref, get } from "firebase/database";
import PendingToAcceptionAdmin from "../AcceptionFormAdmin";
import PendingToEvaluationAdmin from "../EvaluationFormAdmin";
import AllTasksAdmin from "../AllTasksAdmin";
import InProgressTasksAdmin from "../InProgressFormAdmin";
import DoneTasksAdmin from "../DoneFormAdmin";
import RejectedTasksAdmin from "../RejectedFormAdmin";
import Statics from "./statics/Statics";

const useStyle = createUseStyles(() => {
  return {
    UserProfile: {
      display: "flex",
      height: "100vh",
    },
  };
});

function UserProfile({ children }) {
  const { user, rull} = useUserAuth(UserAuthContext);
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
    STATICS_PATH
  } = paths;
  console.log(rull)

  const userToolsClose = useCallback(() => {
    setToolsBaropen(!toolsBarOpen);
  });

  return (
    <div className={classes.UserProfile}>
      <UserTools open={toolsBarOpen} userToolsClose={userToolsClose} />
      <Routes>
        <Route
          path={PROFILE_PATH}
          element={rull === "Admin" ?
            <UserWorkingTable open={toolsBarOpen} component={<ProfilePage/>} /> 
            :
            <UserWorkingTable open={toolsBarOpen} component={<ProfilePage />} /> 
          }
        />
        <Route
          path={`${INBOX_PATH}/*`}
          element={ rull === "Admin" ?
            <UserWorkingTable open={toolsBarOpen} component={<Inbox />} /> 
            : 
            <UserWorkingTable open={toolsBarOpen} component={<Inbox />} />
          }
        />
        <Route
          path={ALL_TASKS_PATH}
          element={ rull === "Admin" ?
            <UserWorkingTable open={toolsBarOpen} component={<AllTasksAdmin />} />
            :
            <UserWorkingTable open={toolsBarOpen} component={<AllTasks />} />
          }
        />
        <Route
          path={ACCEPTION_TASKS_PATH}
          element={ rull === "Admin" ?
            <UserWorkingTable
              open={toolsBarOpen}
              component={<PendingToAcceptionAdmin />}
            /> 
            : 
            <UserWorkingTable
              open={toolsBarOpen}
              component={<PendingToAcception />}
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
          path={EVALUATION_TASKS_PATH}
          element={  rull === "Admin" ?
            <UserWorkingTable
              open={toolsBarOpen}
              component={<PendingToEvaluationAdmin />}
            /> 
            :
            <UserWorkingTable
              open={toolsBarOpen}
              component={<PendingToEvaluation />}
            /> 
          }
        />
        <Route
          path={REJECTED_TASKS_PATH}
          element={ rull === "Admin" ?
            <UserWorkingTable
              open={toolsBarOpen}
              component={<RejectedTasksAdmin />}
            /> 
            :
            <UserWorkingTable
            open={toolsBarOpen}
            component={<RejectedTasks />}
          />
          }
        />
        <Route
          path={IN_PROCCESS_TASKS_PATH}
          element={ rull === "Admin" ?
            <UserWorkingTable
              open={toolsBarOpen}
              component={<InProgressTasksAdmin />}
            />
            :
            <UserWorkingTable
              open={toolsBarOpen}
              component={<InProgressTasks />}
            />
          }
        />
        <Route
          path={DONE_TASKS_PATH}
          element={ rull === "Admin" ?
            <UserWorkingTable open={toolsBarOpen} component={<DoneTasksAdmin />} />
            : 
            <UserWorkingTable open={toolsBarOpen} component={<DoneTasks />} />
          }
        />
        <Route
          path={STATICS_PATH}
          element={ rull === "Admin" ?
            <UserWorkingTable open={toolsBarOpen} component={<Statics />} />
            : 
            <UserWorkingTable open={toolsBarOpen} component={<Statics />} />
          }
        />
      </Routes>
    </div>
  );
}

export default UserProfile;

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

const useStyle = createUseStyles(() => {
  return {
    UserProfile: {
      display: "flex",
      height: "100vh",
    },
  };
});

function UserProfile({ children }) {
  const { user } = useUserAuth(UserAuthContext);
  const classes = useStyle();
  const [toolsBarOpen, setToolsBaropen] = useState(true);
  const [client, setClient] = useState("");
  const dbRef = getDatabase();
  const [rull, setRull] = useState();
 
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
  } = paths;

  const userToolsClose = useCallback(() => {
    setToolsBaropen(!toolsBarOpen);
  });

  useEffect(() => {
    get(ref(dbRef, "users/" + user.uid))
    .then((snapshot) => {
      setRull(snapshot.val().roll);
      console.log("our console", rull);
    })
    .catch((error) => {
      console.error(error);
    });
  })

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
            <UserWorkingTable open={toolsBarOpen} component={<AllTasks />} />
            :
            <UserWorkingTable open={toolsBarOpen} component={<AllTasks />} />
          }
        />
        <Route
          path={ACCEPTION_TASKS_PATH}
          element={ rull === "Admin" ?
            <UserWorkingTable
              open={toolsBarOpen}
              component={<PendingToAcception />}
            /> 
            : 
            <UserWorkingTable
              open={toolsBarOpen}
              component={<PendingToAcceptionAdmin />}
            />
          }
        />
        <Route
          path={CREATE_TASK_PATH}
          element={  rull === "Admin" ?
            <UserWorkingTable
              open={toolsBarOpen}
              component={<CreateNewTask />}
            /> 
            :
            null
          }
        />
        <Route
          path={EVALUATION_TASKS_PATH}
          element={  rull === "Admin" ?
            <UserWorkingTable
              open={toolsBarOpen}
              component={<PendingToEvaluation />}
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
              component={<RejectedTasks />}
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
              component={<InProgressTasks />}
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
            <UserWorkingTable open={toolsBarOpen} component={<DoneTasks />} />
            : 
            <UserWorkingTable open={toolsBarOpen} component={<DoneTasks />} />
          }
        />
      </Routes>
    </div>
  );
}

export default UserProfile;

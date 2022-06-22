import "./App.css";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { Route, Routes } from "react-router-dom";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import paths from "./constants/Paths";
import HomePage from "./Components/HomePage/HomePage";
import UserProfile from "./Components/UserProfile/UserProfile";

function App() {
  const { USER_PROFILE_PATH, SIGN_IN_PATH, SIGN_UP_PATH } = paths;
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path={`${USER_PROFILE_PATH}/*`}
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route path={SIGN_UP_PATH} element={<SignUp />} />
        <Route path={SIGN_IN_PATH} element={<SignIn />} />
        <Route path={"*"} element={<UserProfile />} />
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;

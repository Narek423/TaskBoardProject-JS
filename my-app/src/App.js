import "./App.css";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { Route, Routes } from "react-router-dom";
import NavMainBar from "./Components/Nav-Bar/NavMainBar";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import UserProfile from "./Components/UserProfile/UserProfile";
import ProtectedRoute from "./Components/ProtectedRoute";
import EvaluationFormAdmin from "./Components/EvaluationFormAdmin";
import EvaluationFormClient from "./Components/EvaluationFormClient";
import AcceptionFormAdmin from "./Components/AcceptionFormAdmin";
import AcceptionFormClient from "./Components/AcceptionFormClient";

function App() {
  return (
    <>
      <UserAuthContextProvider>
        <Routes>
          <Route path="/" element={<h1>HOME PAGE</h1>} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/profile/admin/inproccestasks/"
            element={<EvaluationFormAdmin />}
          />
          <Route
            path="/profile/client/inproccestasks/"
            element={<EvaluationFormClient />}
          />
          <Route
            path="/profile/admin/acceptiontasks/"
            element={<AcceptionFormAdmin />}
          />
          <Route
            path="/profile/client/acceptiontasks/"
            element={<AcceptionFormClient />}
          />
        </Routes>
      </UserAuthContextProvider>
    </>
  );
}

export default App;

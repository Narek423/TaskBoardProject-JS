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
import InProgressFormAdmin from "./Components/InProgressFormAdmin";
import InProgressFormClient from "./Components/InProgressFormClient";
import DoneFormAdmin from "./Components/DoneFormAdmin";
import DoneFormClient from "./Components/DoneFormClient";
import RejectedFormAdmin from "./Components/RejectedFormAdmin";
import RejectedFormClient from "./Components/RejectedFormClient";
import AllTasksAdmin from "./Components/AllTasksAdmin";
import AllTasksClient from "./Components/AllTasksClient";
import paths from "./Components/constants/Paths";

function App() {
	const  { USER_PROFILE_PATH,SIGN_IN_PATH,SIGN_UP_PATH } = paths;
	return (
		<>
			<UserAuthContextProvider>
				<Routes>
					<Route path='/' element={<h1>HOME PAGE</h1>} />

					<Route
						path={USER_PROFILE_PATH}
						element={
							<ProtectedRoute>
								<UserProfile />
							</ProtectedRoute>
						}
					/>
					<Route path={SIGN_IN_PATH} element={<SignUp />} />
					<Route path={SIGN_UP_PATH} element={<SignIn />} />
					
				</Routes>
			</UserAuthContextProvider>
		</>
	);
}

export default App;

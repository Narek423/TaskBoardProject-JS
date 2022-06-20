import "./App.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { Route, Routes } from "react-router-dom";
import NavMainBar from "./components/Nav-Bar/HomePageNavBar";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Profile from "./components/UserProfile/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import paths from "./constants/Paths";
import HomePage from "./components/HomePage/HomePage";
import UserProfile from "./components/UserProfile/Profile";

function App() {
	const { USER_PROFILE_PATH, SIGN_IN_PATH, SIGN_UP_PATH } = paths;
	return (
		<UserAuthContextProvider>
			<Routes>
				<Route path='/' element={<HomePage />} />

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

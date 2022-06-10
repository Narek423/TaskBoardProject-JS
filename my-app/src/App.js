import "./App.css";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { Route, Routes } from "react-router-dom";
import NavMainBar from "./Components/Nav-Bar/NavMainBar";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import UserProfile from "./Components/UserProfile/UserProfile";
import ProtectedRoute from "./Components/ProtectedRoute";
import paths from "./Components/constants/Paths";

function App() {
	const  { USER_PROFILE_PATH,SIGN_IN_PATH,SIGN_UP_PATH } = paths;
	return (
		<>
			<UserAuthContextProvider>
				<Routes>
					<Route path='/' element={<NavMainBar />} />

					<Route
						path={`${USER_PROFILE_PATH}/*`}
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

import "./App.css";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { Route, Routes } from "react-router-dom";
import NavMainBar from "./Components/Nav-Bar/NavMainBar";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import UserProfile from "./Components/UserProfile/UserProfile";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
	return (
		<>
			<UserAuthContextProvider>
				<Routes>
					<Route path='/' element={<h1>HOME PAGE</h1>} />

					<Route
						path='profile/*'
						element={
							<ProtectedRoute>
								<UserProfile />
							</ProtectedRoute>
						}
					/>
					<Route path='signup' element={<SignUp />} />
					<Route path='signin' element={<SignIn />} />
				</Routes>
			</UserAuthContextProvider>
		</>
	);
}

export default App;

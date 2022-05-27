import "./App.css";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import { Route, Routes } from "react-router-dom";
import NavMainBar from "./Components/Nav-Bar/NavMainBar";
import { UserAuthContextProvider } from "./context/UserAuthContext";

function App() {
	return (
		<>
			<UserAuthContextProvider>
				<NavMainBar />
				<Routes>
				<Route path='/profile' element={<ProtectedRoute><Profile></></ProtectedRoute>} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/signin' element={<SignIn />} />
				</Routes>
			</UserAuthContextProvider>
		</>
	);
}

export default App;

import "./App.css";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import NavMainBar from "./Components/Nav-Bar/NavMainBar";
import { Route, Routes, useNavigate } from "react-router-dom";
import { userDataContext } from "./context/userLogIn";
import { useEffect, useState } from "react";
import Profile from "./Components/Profile";

function App() {
	const [currentUserData, setcurrentUserData] = useState({
		isUserLogdIn: false,
	});
	const navigate = useNavigate();
	useEffect(() => {
		if (currentUserData.isUserLogdIn) {
			navigate("/");
		} else {
			navigate("/signup");
		}
	}, [currentUserData.isUserLogdIn]);

	const updateUser = (data) => {
		setcurrentUserData({
			...data,
			isUserLogdIn: true,
			updateUser,
		});
	};

	useEffect(() => {
		setcurrentUserData({
			...currentUserData,
			updateUser,
		});
	}, []);
	return (
		<>
			<userDataContext.Provider value={currentUserData}>
				<NavMainBar />
				<Routes>
					<Route path='/' element={<Profile />} />
					<Route path='/login' element={<SignIn />} />
					<Route path='/signup' element={<SignUp />} />
				</Routes>
			</userDataContext.Provider>
		</>
	);
}

export default App;

import "./App.css";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import NavMainBar from "./Components/Nav-Bar/NavMainBar";
import { useContext, useMemo } from "react";
import { userData } from "./context/UserData";
import UserProfile from "./Components/UserProfile/UserProfile";



function App() {
	const data = useContext(userData);
	const userMainData = useMemo(() => {
		return data
	  });
	return (
		// <>
		// 	<NavMainBar></NavMainBar>
		// 	<SignUp></SignUp>;
		// </>
			<>
			<userData.Provider value={userMainData}>
			<UserProfile />
			</userData.Provider>
			</>
	);
}

export default App;

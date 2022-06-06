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

function App() {
	return (
		<>
			<UserAuthContextProvider>
				<Routes>
					<Route path='/' element={<h1>HOME PAGE</h1>} />

					<Route
						path='/profile'
						element={
							<ProtectedRoute>
								<UserProfile />
							</ProtectedRoute>
						}
					/>
					<Route path='/signup' element={<SignUp />} />
					<Route path='/signin' element={<SignIn />} />
					<Route
						path='/profile/admin/evaluationtasks/'
						element={<EvaluationFormAdmin />}
					/>
					<Route
						path='/profile/client/evaluationtasks/'
						element={<EvaluationFormClient />}
					/>
					<Route
						path='/profile/admin/acceptiontasks/'
						element={<AcceptionFormAdmin />}
					/>
					<Route
						path='/profile/client/acceptiontasks/'
						element={<AcceptionFormClient />}
					/>
					<Route
						path='/profile/admin/inprogresstasks/'
						element={<InProgressFormAdmin />}
					/>
					<Route
						path='/profile/client/inprogresstasks/'
						element={<InProgressFormClient />}
					/>
					<Route path='/profile/admin/donetasks/' element={<DoneFormAdmin />} />
					<Route
						path='/profile/client/donetasks/'
						element={<DoneFormClient />}
					/>
					<Route
						path='/profile/admin/rejectedtasks/'
						element={<RejectedFormAdmin />}
					/>
					<Route
						path='/profile/client/rejectedtasks/'
						element={<RejectedFormClient />}
					/>
					<Route path='/profile/admin/alltasks/' element={<AllTasksAdmin />} />
					<Route
						path='/profile/client/alltasks/'
						element={<AllTasksClient />}
					/>
				</Routes>
			</UserAuthContextProvider>
		</>
	);
}

export default App;

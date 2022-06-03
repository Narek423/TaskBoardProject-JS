import { signOut } from "firebase/auth";
import { useContext } from "react";
import { UserAuthContext } from "../context/UserAuthContext";
import { app } from "./firebase";

function Profile(props) {
	const data = useContext(UserAuthContext);
	return (
		!data || (
			<>
				<img src={data.avatar} width='200px' height={"200px"} />
				<div>{data.name}</div>
				<div>{data.lastName}</div>
				<div>{data.dateOfBirth}</div>
				<div>{data.taxCode}</div>
				<div>{data.roll}</div>
			</>
		)
	);
}

export default Profile;

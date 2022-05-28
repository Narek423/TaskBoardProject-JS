import { useContext } from "react";
import { userDataContext } from "../context/userLogIn";

function Profile(props) {
	const data = useContext(userDataContext);
	return (
		<>
			<img src={data.avatar} width='200px' height={"200px"} />
			<div>{data.name}</div>
			<div>{data.lastName}</div>
			<div>{data.dateOfBirth}</div>
			<div>{data.taxCode}</div>
			<div>{data.roll}</div>
		</>
	);
}

export default Profile;

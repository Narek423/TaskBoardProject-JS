import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { createUseStyles } from "react-jss";
// import {writeUserEmailTask} from "../../firebase";
import {  useUserAuth } from "../../../context/UserAuthContext";


const useStyle = createUseStyles(() => {
  return {
    sentMail: {
      display: "flex",
      flexDirection: "column",
      width: "60%",
      marginLeft: "2%",
      marginTop: "5%",
    },
  };
});
function CreateMail() {
  const [mailValue, setMailValue] = useState("");
  const [mailContentValue, setMailContentValue] = useState("");
  const classes = useStyle();
  const { user } = useUserAuth();


  const mailSent = () => {
      const date = new Date().toLocaleString();
    // writeUserEmailTask(user.uid,mailValue,mailContentValue,date);
    setMailContentValue('');
    setMailValue('');
  }


  
//   export function writeUserEmailTask(userId,emailTittle,emailText,date) {
// 	const db = getDatabase();
// 	set(ref(db, `inbox/${userId}/` + uuidv4()), {
// 		emailTittle: emailTittle,
// 		emailText: emailText,
// 		state: "unread",
// 	    date: date
// 	});
//   }

  return (
    <div className={classes.sentMail}>
      <TextField
        style={{ marginRight: "1%", flex: 5 }}
        id="outlined-basic"
        value={mailValue}
        onChange={(event) => setMailValue(event.target.value)}
        variant="outlined"
      />
      <TextField
        value={mailContentValue}
        style={{ marginRight: "1%", flex: 5 }}
        onChange={(event) => setMailContentValue(event.target.value)}
        id="outlined-multiline-static"
        multiline
        rows={6}
      />
      <Button variant="contained" size="medium" onClick={mailSent}>
        Sent
      </Button>{" "}
    </div>
  );
}

export default CreateMail;

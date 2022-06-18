import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import { createUseStyles } from "react-jss";
import { useUserAuth } from "../../../context/UserAuthContext";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import { getDatabase, ref, get, set } from "firebase/database";
import Rolls from "../../../constants/Rolls";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";


const useStyle = createUseStyles(() => {
  return {
    sentMail: {
      display: "flex",
      flexDirection: "column",    
      width: "60%",
      marginLeft: "2%",
      marginTop: "5%",
    },
    sentMailModal:  {
      display: "flex",
      flexDirection: "column",
      width: "95%",
      marginLeft: "2%",
      marginTop: "5%",
    }
  };


});

function CreateMail(props) {
  const [mailValue, setMailValue] = useState("");
  const [mailContentValue, setMailContentValue] = useState("");
  const classes = useStyle();
  const [emails, setEmails] = useState([]);
  const { user } = useUserAuth();
  const { Admin } = Rolls;
  const [choosenEmails,setChoosenEmails] = useState([]);
  const [value,setValue] = useState([]);
  const navigate = useNavigate();
  const { inPage } = props;


  const mailSent = () => {
    const date = new Date().toLocaleString();
    writeUserEmailTask(choosenEmails,mailValue,mailContentValue,date);
    setMailContentValue("");
    setMailValue("");
    setChoosenEmails([]);
    setValue([]);
    };

   function writeUserEmailTask(choosenEmails,emailTittle,emailText,date) {
  	const db = getDatabase();
    choosenEmails.forEach(email => {
      const userGetter =  emails.find((e) => email === e.email );
      console.log(user)
        
      set(ref(db, `inbox/${user.uid}/` + uuidv4()), {
        emailTittle: emailTittle,
        emailText: emailText,
        state: false,
        date: date
      });
      set(ref(db, `inbox/${userGetter.clientId}/` + uuidv4()), {
        emailTittle: emailTittle,
        emailText: emailText,
        state: false,
        date: date
      });
    });
    };


    useEffect(() => {
    const dbRef = getDatabase();
    let usersData = [];

    get(ref(dbRef, "users"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(data)
          for (let key in data) {
            if (data[key].email && data[key].roll === "Client") {
              usersData.push({email:data[key].email,clientId: key});
            }
          }
        }
        setEmails(usersData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user,Admin]);

  const autoComplete = (value, getTagProps) => {
    if(value.length > 2){
      value.pop();
    }
    setChoosenEmails(value);
    return value.map((option, index) => (
      <Chip
        variant="outlined"
        label={option}
        {...getTagProps({ index })}
      />
    
    ))}

  return (
    <div className={inPage === "inPage" ? classes.sentMail : classes.sentMailModal}>
      <Autocomplete
        multiple
        id="tags-filled"
        options={emails.map((option) => option.email)}
        style={{
          flex: 5,
          marginBottom: '1%',
         
        }}
        freeSolo
        value={value} 
        onChange={(event,value) => {
          setValue(value)
        }}
        renderTags={autoComplete}
        renderInput={(choosenEmails) => (
          <TextField
            {...choosenEmails}
            variant="filled"
            label="To"
            placeholder="Email"
          />
        )}
      />
      <TextField
        style={{ marginRight: "1%", marginBottom: '1%',flex: 5 }}
        id="outlined-basic"
        value={mailValue}
        onChange={(event) => setMailValue(event.target.value)}
        variant="outlined"
      />
      <TextField
        value={mailContentValue}
        style={{ marginRight: "1%",marginBottom: '1%', flex: 4 }}
        onChange={(event) => setMailContentValue(event.target.value)}
        id="outlined-multiline-static"
        multiline
        rows={6}
      />
      <Button variant="contained" size="medium" onClick={mailSent} style={
        {
          margin: 'auto',
          marginBottom: '1%',
        }
      }>
        Sent
      </Button>
    </div>
  );
}

export default CreateMail;

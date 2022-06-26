import React, { useEffect, useState } from "react";
import { TextField, Button, Card } from "@mui/material";
import { createUseStyles } from "react-jss";
import { useUserAuth } from "../../../context/UserAuthContext";
import Autocomplete from "@mui/material/Autocomplete";
import { getDatabase, ref, get, set, push } from "firebase/database";

const useStyle = createUseStyles(() => {
  return {
    sentMail: {
      display: "flex",
      flexDirection: "column",
      marginTop: "5%",
      width: "90%",
      margin: "auto",
    },
    sentMailModal: {
      display: "flex",
      flexDirection: "column",
      width: "95%",
      marginLeft: "2%",
      marginTop: "5%",
    },
  };
});

function CreateMail(props) {
  const [mailValue, setMailValue] = useState("");
  const [mailContentValue, setMailContentValue] = useState("");
  const classes = useStyle();
  const [emails, setEmails] = useState([]);
  const { user } = useUserAuth();
  const [choosenEmail, setChoosenEmail] = useState([]);
  const [value, setValue] = useState(null);
  const { inPage } = props;

  const mailSent = () => {
    const date = new Date().toLocaleString();
    writeUserEmailTask(choosenEmail, mailValue, mailContentValue, date);
    setMailContentValue("");
    setMailValue("");
    setChoosenEmail();
    setValue(null);
  };

  function writeUserEmailTask(choosenEmail, emailTittle, emailText, date) {
    const db = getDatabase();
    const userGetter = emails.find((e) => choosenEmail === e.email);
    const fromRef = ref(db, `inbox/${user.uid}/`);
    const newfromPostRef = push(fromRef);
    set(newfromPostRef, {
      emailTittle: emailTittle,
      emailText: emailText,
      state: true,
      date: date,
      to: { id: userGetter.clientId, email: userGetter.email },
      from: { id: user.uid, email: user.email },
    });

    const toRef = ref(db, `inbox/${userGetter.clientId}/`);
    const newtoPostRef = push(toRef);
    set(newtoPostRef, {
      emailTittle: emailTittle,
      emailText: emailText,
      state: false,
      date: date,
      to: { id: userGetter.clientId, email: userGetter.email },
      from: { id: user.uid, email: user.email },
    });
  }

  useEffect(() => {
    const dbRef = getDatabase();
    let usersData = [];
    get(ref(dbRef, "users"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          for (let key in data) {
            if (data[key].email) {
              if (key === user.uid) continue;
              usersData.push({ email: data[key].email, clientId: key });
            }
          }
        }
        setEmails(usersData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  return (
    <Card
      style={{
        justifyContent: "center",
        height: "100%",
        width: "60%",
        margin: "auto",
        marginTop: "2%",
        textAlign: "center",
        border: "4px solid #1264F3",
      }}
    >
      <div
        className={
          inPage === "inPage" ? classes.sentMail : classes.sentMailModal
        }
      >
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={emails.map((option) => option.email)}
          style={{ marginBottom: "2%", flex: 5 }}
          value={value}
          onChange={(event, value) => {
            setValue(value);
          }}
          renderInput={(options) => {
            setChoosenEmail(options?.inputProps?.value);
            return <TextField {...options} label="User" />;
          }}
        />
        <TextField
          style={{ marginBottom: "2%", flex: 5 }}
          id="outlined-basic"
          value={mailValue}
          label="Tittle"
          onChange={(event) => setMailValue(event.target.value)}
          variant="outlined"
        />
        <TextField
          value={mailContentValue}
          style={{ marginTop: "2%", flex: 4 }}
          onChange={(event) => setMailContentValue(event.target.value)}
          id="outlined-multiline-static"
          multiline
          label="Text"
          rows={6}
        />
        <Button
          variant="contained"
          size="medium"
          onClick={mailSent}
          style={{
            margin: "auto",
            marginTop: "1%",
            marginBottom: "1%",
          }}
        >
          Sent
        </Button>
      </div>
    </Card>
  );
}

export default CreateMail;

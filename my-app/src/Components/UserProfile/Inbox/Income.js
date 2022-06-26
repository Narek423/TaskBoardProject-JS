import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../../context/UserAuthContext";
import { createUseStyles } from "react-jss";
import Pagination from "@mui/material/Pagination";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { get, ref, getDatabase, onChildAdded } from "firebase/database";
import { deepOrange, deepPurple } from "@mui/material/colors";
import EmailModal from "./EmailModal";

const useStyle = createUseStyles(() => {
  return {
    mail: {
      fontFamily: "monospace",
      fontSize: 20,
      display: "flex",
      paddingBottom: "1%",
      height: "100%",
      "&:hover": {
        fontSize: 25,
        boxShadow: "#1264F3 0 -6px 8px inset",
        cursor: "pointer",
      },
      email: {
        fontStyle: "italic",
        backgroundColor: "red",
      },
    },
  };
});

function Income() {
  const { user } = useUserAuth();
  const [emails, setEmails] = useState([]);
  const dbRef = getDatabase();
  const [page, setPage] = useState(1);
  const [emailsData, setEmailsData] = useState([]);
  const [pageQuantity, setPageQuantity] = useState(0);
  const [email, setEmail] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    get(ref(dbRef, `inbox/${user.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = [];
          for (let key in snapshot.val()) {
            data.push({ key: key, value: snapshot.val()[key] });
          }
          return setEmails([...data].reverse());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dbRef, user]);

  useEffect(() => {
    const commentsRef = ref(dbRef, `inbox/${user.uid}`);
    onChildAdded(commentsRef, (data) => {
      get(ref(dbRef, `inbox/${user.uid}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = [];
            for (let key in snapshot.val()) {
              data.push({ key: key, value: snapshot.val()[key] });
            }
            return setEmails([...data].reverse());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
      setEmailsData([]);
      setPageQuantity(Math.ceil(emails.length / 10));
      const start = page * 10 - 10;
      const end = page * 10;
      const pageData = [];
      for (let i = start; i < end; i++) {
        if (!emails[i]) break;
        pageData.push({ key: emails[i].key, value: emails[i].value });
      }
      setEmailsData(pageData);
    });
  }, [dbRef, emails, page, user.uid]);

  useEffect(() => {
    setEmailsData([]);
    setPageQuantity(Math.ceil(emails.length / 10));
    const start = page * 10 - 10;
    const end = page * 10;
    const pageData = [];
    for (let i = start; i < end; i++) {
      if (!emails[i]) break;
      pageData.push({ key: emails[i].key, value: emails[i].value });
    }
    setEmailsData(pageData);
  }, [emails, page]);

  return (
    <div
      style={{
        flex: 5,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          flex: 10,
        }}
      >
        <List
          sx={{ width: "80%", maxHeight: "5%", bgcolor: "background.paper" }}
        >
          {emailsData.map((elem, index) => {
            const e = elem.value;
            console.log(e);
            if (index > 8) return;
            return (
              <ListItem
                key={index}
                sx={e?.state ? null : { fontWeight: "bold" }}
                alignItems="flex-start"
                onClick={(key) => {
                  setEmail(e);
                  setOpen(true);
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={e?.from?.email}
                    sx={
                      e?.state
                        ? { bgcolor: deepOrange[500] }
                        : { bgcolor: deepPurple[500] }
                    }
                    src={"img"}
                  />
                </ListItemAvatar>
                <ListItemText
                  sx={{ fontWeight: "bold" }}
                  primary={e?.from?.email}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={
                          e?.state
                            ? { display: "inline", fontWeight: "cursive" }
                            : { display: "inline", fontWeight: "bold" }
                        }
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {e?.emailText?.length > 30
                          ? e.emailText.substr(0, 30)
                          : e?.emailText}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </div>
      <div
        style={{
          flex: 1,
          position: "fixed",
          bottom: 5,
          right: "30%",
        }}
      >
        <Pagination
          count={pageQuantity}
          page={page}
          onChange={(event, num) => setPage(num)}
          color="primary"
        />
      </div>
      {open ? <EmailModal component={email} setOpen={setOpen} /> : null}
    </div>
  );
}

export default Income;

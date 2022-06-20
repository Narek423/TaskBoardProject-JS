import React, { useEffect, useMemo, useState } from "react";
// import { getInbox } from "../../firebase";
import { useUserAuth } from "../../../context/UserAuthContext";
import { createUseStyles } from "react-jss";
import Pagination from "@mui/material/Pagination";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import {
  child,
  get,
  ref,
  getDatabase,
  query,
  limitToLast,
  limitToFirst,
  onChildAdded,
} from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { deepOrange, deepPurple } from '@mui/material/colors';



const useStyle = createUseStyles(() => {
  return {
    mail: {
      fontFamily: "monospace",
      fontSize: 20,
      display: "flex",
      paddingBottom: "1%",
      "&:hover": {
        //    backgroundColor: "#019CAD",
        fontSize: 25,
        boxShadow: "#1264F3 0 -6px 8px inset",
        cursor: "pointer",
      },
    },
  };
});

function Income() {
  const [inboxData, setInboxData] = useState([]);
  const { user } = useUserAuth();
  const data = [];
  const classes = useStyle();
  const [emails, setEmails] = useState([]);
  const dbRef = getDatabase();

  useEffect(() => {
    const newMsg = query(ref(dbRef, `inbox/${user.uid}`), limitToFirst(5));
    get(newMsg).then(snap => console.log(snap.val(),'querySnapshot')).catch(err => console.log(err))

   get(ref(dbRef, `inbox/${user.uid}`))
	.then((snapshot) => {
	  if (snapshot.exists()) {
		const data = [];
		for (let key in snapshot.val()) {
		  data.push(snapshot.val()[key]);
		}
		return setEmails([...data].reverse());
	  } else {
		console.log("No data available");
	  }
	})
	.catch((error) => {
	  console.error(error);
	});
  }, []);

//   useEffect(() => {
//     const commentsRef = ref(dbRef, `inbox/${user.uid}`);
//     onChildAdded(commentsRef, (data) => {
//       //   addCommentElement(postElement, data.key, data.val().text, data.val().author);
//       dataAdded();
//     });
//   }, []);


  const dataAdded = () => {
	get(ref(dbRef, `inbox/${user.uid}`))
	.then((snapshot) => {
	  if (snapshot.exists()) {
		const data = [];
		for (let key in snapshot.val()) {
		  data.push(snapshot.val()[key]);
		}
    console.log(data,'start');
    data.reverse();
    console.log(data,'end');
		return setEmails([...data]);
	  } else {
		console.log("No data available");
	  }
	})
	.catch((error) => {
	  console.error(error);
	});
  }

 
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
          backgroundColor: 'red',
          flex: 10,
        }}
      >
        <div
          style={{ flex: 1,width: "100%",  bgcolor: "background.paper",backgroundColor: 'yellow', display: 'flex',flexDirection: 'column' }}
        >
          {emails.map((e,index) => {
            console.log(e.emailTittle)
            if(index > 9) return;
            return (
              <div
				        key={uuidv4()}
                onClick={() => alert(e.emailText)}
                style={{
                  flex: 1,
                  display: 'flex',
                  marginTop: "1%", 
                  marginRight: '"2%',
                  alignItems: 'center'
                }}
                
              >
                <Avatar sx={{ bgcolor: deepOrange[500] }} alt={e?.from?.email} src={"img"} />
                <p style={{
                width: '10%',
                maxWidth: 20
               }}>{e?.emailTittle?.length > 15 ? e?.emailTittle?.substr(0,15) : e.emailTittle.length}
               </p>
               <p style={{
                width: '10%',
                maxWidth: 20
               }}>{e.emailText.length > 15 ? e.emailText.substr(0,15) : e.emailText}
               </p>
              </div>
            );
          })}
        </div>
        {/* <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {emails.map((e,index) => {
            if(index > 8) return;
            return (
              <ListItem
				        key={uuidv4()}
                alignItems="flex-start"
                onClick={() => alert(e.emailText)}
                
              >
                <ListItemAvatar>
                  <Avatar alt={e?.from?.email} src={"img"} />
                </ListItemAvatar>
                <ListItemText
                  primary={e.emailTittle}
                  secondary={
                    <React.Fragment>
                      <Typography
                        
                        sx={{ display: "inline"}}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                      
                      </Typography>
                      {e.emailText}
                    </React.Fragment>
                  }
                />
              </ListItem>
            );
          })}
        </List> */}
      </div>
      <div
        style={{
          flex: 1,
          // margin: "auto",
          position: 'fixed',
          bottom: 5,
          // left: '50%',
          right: '30%'
        }}
      >
        <Pagination count={Math.round(emails.length/10)} color="primary" />
      </div>
    </div>
  );
}

export default Income;

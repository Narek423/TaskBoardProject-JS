import React, { useEffect, useMemo, useState } from "react";
// import { getInbox } from "../../firebase";
import { useUserAuth } from "../../../context/UserAuthContext";
import { createUseStyles } from "react-jss";
import Pagination from '@mui/material/Pagination';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { child, get, ref,getDatabase } from "firebase/database";


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
  const { user,imgUrl } = useUserAuth();
  const [listCountCheck, setListCountCheck] = useState([0, 10]);
  const data = [];
  const classes = useStyle();
  const [emails,setEmails] = useState([])



  useEffect(() => {

    const dbRef = getDatabase();
    console.log(user.uid)
    get(ref(dbRef, `inbox/${user.uid}`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val())
        const data = [];
        for(let key in snapshot.val()){
          data.push(snapshot.val()[key])
        }
        return setEmails([...data]);
    } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    
  },[user])
      
   console.log(user)
  // for (let key in inboxData) {
  //   data.push([key, inboxData[key]]);
  // }
  // const content = [];
  // for (let i = start; i < end; i++) {
  //   content.push(data[i]);
  // }


  return (
   <div style={{
    flex: 5,
    display: 'flex',
    flexDirection: 'column'
   }}>
    <div style={{
      flex: 10, 
    }}>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        { emails.map((e) => {
          console.log(e)
          return <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={user.email} src={imgUrl}/>
          </ListItemAvatar>
          <ListItemText
            primary={e.emailTittle}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {e.emailText}
                </Typography>
                {e.emailText}
              </React.Fragment>
            }
          />
        </ListItem>
        })}
      
      
    </List>
    </div>
    <div  style={{
        flex: 1,
        margin: 'auto'
      }}>
      <Pagination count={10} color="secondary" />
      </div>
   </div>
  );
}


export default Income;

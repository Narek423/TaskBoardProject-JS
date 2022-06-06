import React from "react";
import { createUseStyles } from "react-jss";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router-dom";

const useStyle = createUseStyles(() => {
  return {
    links: {
      display: "flex",
    },
  };
});

function InboxLinks() {
  const classes = useStyle();
  const navigate = useNavigate();
  return (
  
      <div className={classes.links}>
        <div
        onClick={() => navigate('')}
          style={{
            alignItems: "center",
            marginLeft: '2%'
          }}
        >
          <DraftsIcon />
          Inbox
        </div >
        <div 
        onClick={() => navigate('createMail')}
        style={{
            alignItems: "center",
            marginLeft: '2%'
          }}>
          <SendIcon />
          Sent
        </div>
        <div style={{
            justifyContent: 'stretch',
            marginLeft: '2%',
          }}>
          <AssignmentIcon />
          Drafts
        </div>
        <div 
     onClick={() => navigate('spam')}
        style={{
            alignItems: "center",
            marginLeft: '2%',

          }}>
          <ThumbDownOffAltIcon />
          <span>Spam</span>
        </div>
        <div 
        
            style={{
            alignItems: "center",
            marginLeft: '2%'
          }}>
          <DeleteOutlineIcon />
          Trash
        </div>
      </div>
      
  );
}

export default InboxLinks;

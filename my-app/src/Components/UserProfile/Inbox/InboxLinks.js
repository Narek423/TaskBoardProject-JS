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
    div: {
      display :'flex',
      alignItems: "center",
      marginLeft: "2%",
      "&:hover": {
        // boxShadow: "blue 0 -6px 18px inset",
        transform: "scale(1.21)",
        cursor: "pointer",
      },
    },
  };
});

function InboxLinks() {
  const classes = useStyle();
  const navigate = useNavigate();
  return (
    <div className={classes.links}>
      <div onClick={() => navigate("")} className={classes.div}>
        <DraftsIcon />
        Inbox
      </div>
      <div onClick={() => navigate("createMail")} className={classes.div}>
        <SendIcon />
        Sent
      </div>
      <div className={classes.div}>
        <AssignmentIcon />
        Drafts
      </div>
      <div onClick={() => navigate("spam")} className={classes.div}>
        <ThumbDownOffAltIcon />
        <span>Spam</span>
      </div>
      <div className={classes.div}>
        <DeleteOutlineIcon />
        Trash
      </div>
    </div>
  );
}

export default InboxLinks;

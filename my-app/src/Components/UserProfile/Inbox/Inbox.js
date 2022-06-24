import React from "react";
import { createUseStyles } from "react-jss";
import { Route, Routes } from "react-router-dom";
import CreateMail from "./CreateMail";
import InboxLinks from "./InboxLinks";
import Income from "./Income";
import Spam from "./Spam";

const useStyle = createUseStyles(() => {
  return {
    title: {
      textAlign: "center",
      fontFamily: "cursive",
      fontSize: 50,
    },
    emailTable: {
       backgroundColor:' grey',
       width: '120vh',
       height: "80vh",
       marginLeft: "2%"
    }
  };
});

function Inbox() {
  const classes = useStyle();
  return (
    <div style={{
      position: 'relative'
    }}>
      <div className={classes.title}>Inbox </div>
      <InboxLinks />
     <Routes>
       <Route path="/" element={<Income />}/>
       <Route path="spam" element={<Spam />}/>
       <Route path="createMail" element={<CreateMail />}/>
     </Routes>
    </div>
  );
}

export default Inbox;

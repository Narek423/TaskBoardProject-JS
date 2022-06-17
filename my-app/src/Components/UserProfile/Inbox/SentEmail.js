import React, { useState } from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import EmailModal from "./EmailModal";

function SentEmail() {
  const [emailModal,sentEmailModal] = useState(false);

  return (
    <>
    <Fab color="primary" aria-label="add" 
    onClick={() => {sentEmailModal(true)}}
    style={{
      position: "fixed",
      bottom: 70,
      right: 10,
    }}>
      <MailOutlineIcon />
    </Fab>
    {emailModal ? <EmailModal inPage={"modal"} sentEmailModal={sentEmailModal} emailModal={emailModal}/> : null}
    </>
  );
}

export default SentEmail;

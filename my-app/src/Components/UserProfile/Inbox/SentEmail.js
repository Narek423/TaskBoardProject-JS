import React, { useState } from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import EmailModal from "./EmailModal";
import { useNavigate } from "react-router-dom";
import paths from "../../../constants/Paths";

function SentEmail() {
  const [emailModal,sentEmailModal] = useState(false);
  const navigate = useNavigate();
  const { } = paths;

  return (
    <>
    <Fab color="primary" aria-label="add" 
    onClick={ () => navigate(`/inbox/createMail`)}
    style={{
      position: "fixed",
      bottom: 70,
      right: 10,
    }}>
      <MailOutlineIcon />
    </Fab>
    {/* {emailModal ? <EmailModal inPage={"modal"} sentEmailModal={sentEmailModal} emailModal={emailModal}/> : null} */}
    </>
  );
}

export default SentEmail;

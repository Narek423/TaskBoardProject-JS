import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import CreateMail from "./CreateMail";
import { createUseStyles } from "react-jss";
import { ClassNames } from "@emotion/react";

const useStyle = createUseStyles(() => {
    return {

        modal: {
            position: "fixed",
            width: '35%',
            top: "46%",
            left: "59%",
            minHeight: '30%',
            border: "4px solid #000",
            borderRadius: 8,
            backgroundColor: 'white',
            textAlign: 'center',
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              width: 10,
            },
            "&::-webkit-scrollbar-track": {
              background: "white",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#019CAD",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#019CAD",
            },
          //   boxShadow: 24,
          //   p: 4,
          },
          close: {
            position: "absolute",
            right: 15,
            cursor: 'pointer'
          },
          title:  {
            cursor: 'pointer',
            fontFamily: 'bolt',
            fontSize: 25
          },
        
    }
})

function EmailModal(props) {
  const { emailModal, sentEmailModal } = props;
  const classes = useStyle();
  const handleClose = () => sentEmailModal(false);

  return (
    <div
      className={
        emailModal
          ? classes.modal
          : null
      }
    >
        <span className={classes.title}>SentEmail</span><span onClick={() => sentEmailModal(false)} className={classes.close}>X</span>
      <CreateMail />
    </div>
  );
}

export default EmailModal;

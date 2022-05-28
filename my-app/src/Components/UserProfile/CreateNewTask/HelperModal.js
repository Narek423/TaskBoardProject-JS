import React, { useCallback, useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { createUseStyles } from "react-jss";

const useStyle = createUseStyles(() => {
  return {
    modal: {
      height: "100%",
      width: "100vw",
      backgroundColor: "rgb(0,0,0,0.1)",
      position: "fixed",
      left: 0,
    },
    modalText: {
      width: 140,
      fontFamily: 'cursive',
      fontSize: 13,
      position: "fixed",
      backgroundColor: "#d0e2e5",
      borderRadius: 5,
      border: "1px solid black",
    },
    p: {
      fontFamily: 'monospace'
    }
  };
});

function HelperModal(props) {
  const classes = useStyle();
  const [open, setOpen] = useState(false);

  const onModalOpen = useCallback(() => {
    setOpen(!open);
  });
  const onModalClose = useCallback(() => {
    setOpen(!open);
  });

  return (
    <div style={props.style}>
      <p >{props.inputName}</p>
      <HelpOutlineIcon
        style={props.style}
        fontSize="small"
        color="primary"
        onMouseEnter={onModalOpen}
        onMouseLeave={onModalClose}
      />
      <div>
        {!!open ? (
          <div className={classes.modalText}>{props.text}</div>
        ) : null}
      </div>
    </div>
  );
}
export default HelperModal;

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { DialogActions, TextField } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EmailModal({ component, setOpen }) {
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <div
              style={{
                textAlign: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <AccountCircleIcon sx={{ fontSize: 25 }} />{" "}
              <span style={{
                marginLeft: '1%'
              }}>{component.from.email}</span>
            </div>
          </Typography>
          <TextField
            defaultValue={component?.emailTittle}
            style={{ width: "100%", marginTop: "2%" }}
            id="outlined-multiline-static"
            multiline
            label="tittle"
            rows={4}
          />
          <TextField
            defaultValue={component?.emailText}
            style={{ width: "100%", marginTop: "2%" }}
            id="outlined-multiline-static"
            multiline
            label="text"
            rows={6}
          />
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Box>
      </Modal>
    </div>
  );
}

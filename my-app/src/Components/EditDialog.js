import { React, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { editTasksData } from "./firebase";

export default function EditDialog(props) {
  const { edit, setEdit, editData, rowData, setRowData } = props;
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [notes, setNotes] = useState();

  const handleClose = () => {
    setEdit(false);
    setTitle(null);
    setDescription(null);
    setNotes(null);
  };
  const handleEdit = () => {
    setEdit(false);
    editTasksData(
      title === "" ? "" : title || editData?.data.title,
      description === "" ? "" : description || editData?.data.description,
      notes === "" ? "" : notes || editData?.data.notes,
      editData.data.id
    );
    setTitle(null);
    setDescription(null);
    setNotes(null);
  };
  const currentEditRowData = () => {
    setRowData(
      rowData.map((elem) =>
        elem.id !== editData.data.id
          ? elem
          : {
              ...elem,
              title: title === "" ? "" : title || editData?.data.title,
              description:
                description === ""
                  ? ""
                  : description || editData?.data.description,
              notes: notes === "" ? "" : notes || editData?.data.notes,
            }
      )
    );
  };
  return (
    <div>
      <Dialog open={edit} onClose={handleClose}>
        <DialogTitle> Change task information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to change the following information ?
          </DialogContentText>
          <TextField
            value={title === "" ? "" : title || editData?.data.title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Task title"
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            value={
              description === ""
                ? ""
                : description || editData?.data.description
            }
            onChange={(e) => setDescription(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Task description"
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            value={notes === "" ? "" : notes || editData?.data.notes}
            onChange={(e) => setNotes(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                handleEdit();
                currentEditRowData();
              }
            }}
            autoFocus
            margin="dense"
            id="name"
            label="Task Notes"
            type="email"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleEdit();
              currentEditRowData();
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

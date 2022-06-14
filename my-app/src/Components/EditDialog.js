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
	console.log(title);

	const handleClose = () => {
		setEdit(false);
		setTitle(null);
		setDescription(null);
	};
	const handleEdit = () => {
		setEdit(false);
		editTasksData(title, description, editData.data.id);
		setTitle(null);
		setDescription(null);
	};
	const currentEditRowData = () => {
		setRowData(
			rowData.map((elem) =>
				elem.id !== editData.data.id ? elem : { ...elem, title, description }
			)
		);
	};
	return (
		<div>
			<Dialog open={edit} onClose={handleClose}>
				<DialogTitle>Editing Dialog</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Do you really want to edit the following inputs ?
					</DialogContentText>
					<TextField
						value={title === "" ? "" : title || editData?.data.title}
						onChange={(e) => setTitle(e.target.value)}
						autoFocus
						margin='dense'
						id='name'
						label='Task title'
						type='email'
						fullWidth
						variant='outlined'
					/>
					<TextField
						value={
							description === ""
								? ""
								: description || editData?.data.description
						}
						onChange={(e) => setDescription(e.target.value)}
						autoFocus
						margin='dense'
						id='name'
						label='Task description'
						type='email'
						fullWidth
						variant='outlined'
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>No</Button>
					<Button
						onClick={() => {
							handleEdit();
							currentEditRowData();
						}}
					>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

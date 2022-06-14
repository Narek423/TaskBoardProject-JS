import React, { useCallback, useMemo, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { createUseStyles } from "react-jss";
import { getDatabase, ref, get } from "firebase/database";
import { UserAuthContext, useUserAuth } from "../../context/UserAuthContext";
import { sharedStyles } from "../../styles/sharedStyles";
import GridColumns from "../GridColumns";
import EditDialog from "../EditDialog";

function PendingToEvaluation(props) {
	const classes = sharedStyles;
	const { user } = useUserAuth(UserAuthContext);
	const clientId = user.uid;
	const [rowData, setRowData] = useState();
	const [edit, setEdit] = useState(false);
	const [editData, setEditData] = useState(null);

	const gridParams = {
		checkbox: false,
		username: { rowGroup: false, hide: true, flex: 3, panel: true },
		title: { rowGroup: false, hide: false, flex: 3, panel: false },
		creationDate: { rowGroup: false, hide: false, flex: 1, panel: false },
		description: { rowGroup: false, hide: false, flex: 5, panel: false },
		notes: { rowGroup: false, hide: false, flex: 4, panel: false },
		quantity: { rowGroup: false, hide: true, flex: 1, panel: true },
		unit: { rowGroup: false, hide: true, flex: 1, panel: true },
		costForUnit: { rowGroup: false, hide: true, flex: 1, panel: true },
		totalCost: { rowGroup: false, hide: true, flex: 1, panel: true },
		state: { rowGroup: false, hide: true, flex: 2, panel: true },
		status: { rowGroup: false, hide: true, flex: 2, panel: true },
	};
	const columnDefs = GridColumns(gridParams);

	const defaultColDef = useMemo(() => {
		return {
			className: classes.defaultColDef,
			editable: true,
			sortable: true,
			minWidth: 100,
			filter: true,
			resizable: true,
			floatingFilter: true,
			flex: 1,
		};
	}, []);

	const sideBar = useMemo(() => {
		return {
			defaultColDef,
			toolPanels: ["columns", "filters"],
			defaultToolPanel: "",
		};
	}, []);

	const onGridReady = useCallback((params) => {
		const dbRef = getDatabase();
		let data = {};
		let dataGrid = [];
		let clientData = {};
		get(ref(dbRef, "users/" + clientId))
			.then((snapshot) => {
				if (snapshot.exists()) {
					clientData = snapshot.val();
				}
			})
			.catch((error) => {
				console.error(error);
			});

		get(ref(dbRef, "tasks"))
			.then((snapshot) => {
				if (snapshot.exists()) {
					data = snapshot.val();
					console.log("task", data);
					for (let key in data) {
						if (
							data[key].clientId === clientId &&
							data[key].state === "Evaluation"
						) {
							data[key].id = key;
							data[key] = { ...data[key], ...clientData };
							dataGrid.push(data[key]);
						}
					}
					setRowData(dataGrid);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	const editDialog = (event) => {
		console.log("task5454", event);
		setEdit(true);
		setEditData(event);
	};
	console.log(rowData);
	return (
		<div style={classes.containerStyle}>
			<span style={classes.formName}>Evaluation tasks</span>
			<div style={classes.gridStyle} className='ag-theme-alpine'>
				<AgGridReact
					rowData={rowData}
					columnDefs={columnDefs}
					rowSelection={"single"}
					suppressRowClickSelection={false}
					defaultColDef={defaultColDef}
					sideBar={sideBar}
					onGridReady={onGridReady}
					onRowClicked={editDialog}
				></AgGridReact>
			</div>

			<EditDialog
				edit={edit}
				setEdit={setEdit}
				editData={editData}
				rowData={rowData}
				setRowData={setRowData}
			/>
		</div>
	);
}

export default PendingToEvaluation;

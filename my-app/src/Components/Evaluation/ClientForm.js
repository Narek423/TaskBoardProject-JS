import React, { useCallback, useMemo, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { createUseStyles } from "react-jss";
import { getDatabase, ref, get } from "firebase/database";
import { UserAuthContext, useUserAuth } from "../../context/UserAuthContext";
import ViewTask from "../ViewTask/Main";
import gridPainting, { gridDialogSwitcher } from "../../utils/grid";
import { useSharedStyles } from "../../styles/sharedStyles";
import EditDialog from "../EditDialog";

function PendingToEvaluation(props) {
	const classes = useSharedStyles();
	const { user } = useUserAuth();
	const clientId = user.uid;
	const [rowData, setRowData] = useState();
	const [data, setData] = useState();
	const [isOpen, setIsOpen] = useState(false);
	const [edit, setEdit] = useState(false);
	const [passEvent, setPassEvent] = useState();

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
	const columnDefs = gridPainting(gridParams);

	const defaultColDef = useMemo(() => {
		return {
			className: classes.defaultColDef,
			editable: false,
			sortable: true,
			minWidth: 100,
			filter: true,
			resizable: true,
			floatingFilter: true,
			flex: 1,
		};
	}, [classes.defaultColDef]);

	const sideBar = useMemo(() => {
		return {
			defaultColDef,
			toolPanels: ["columns", "filters"],
			defaultToolPanel: "",
		};
	}, [defaultColDef]);

	const onRowDoubleClicked = useCallback((param) => {
		const selectedRow = param.api.getSelectedRows();
		if (selectedRow.length === 1) {
			setData(selectedRow[0]);
			setIsOpen(true);
		}
	}, []);

	const onGridReady = (params) => {
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
	};

	const gridStyle = () => {
		return { width: "100%", margin: "auto", flex: 10 };
	};
	const editData = [];
	const dialogOpeningFunction = (e) => {
		if (gridDialogSwitcher[0]) {
			setPassEvent(e);
			setEdit(true);
			gridDialogSwitcher[0] = false;
		}
	};

	return (
		<div className={classes.containerStyle}>
			<span className={classes.formName}>Evaluation tasks</span>
			<div style={gridStyle()} className='ag-theme-alpine'>
				<AgGridReact
					rowData={rowData}
					columnDefs={columnDefs}
					rowSelection={"multiple"}
					suppressRowClickSelection={false}
					defaultColDef={defaultColDef}
					sideBar={sideBar}
					onGridReady={onGridReady}
					onRowDoubleClicked={onRowDoubleClicked}
					onRowClicked={dialogOpeningFunction}
				></AgGridReact>
				{isOpen && <ViewTask data={data} setIsOpen={setIsOpen} />}
				<EditDialog
					edit={edit}
					setEdit={setEdit}
					editData={passEvent}
					rowData={rowData}
					setRowData={setRowData}
				/>
			</div>
		</div>
	);
}

export default PendingToEvaluation;

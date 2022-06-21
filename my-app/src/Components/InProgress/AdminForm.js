import React, { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { getDatabase, ref, get, update } from "firebase/database";
import States from "../../constants/States";
import Statuses from "../../constants/Statuses";
import ViewTask from "../ViewTask/Main";
import gridPainting from "../../utils/grid";
import { useSharedStyles } from "../../styles/sharedStyles";

function InProgressTasksAdmin(props) {
  const classes = useSharedStyles();
  const [data, setData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const onCellEditingStopped = useCallback((event) => {
    const selectedRow = event.data;
    const db = getDatabase();
    const postData = {
      title: selectedRow.title,
      description: selectedRow.description,
      notes: selectedRow.notes,
      quantity: selectedRow.quantity,
      costForUnit: selectedRow.costForUnit,
      unit: selectedRow.unit,
      cost: selectedRow.cost,
      status: selectedRow.status,
      state:
        selectedRow.status === Statuses[3] ? States.done : States.inProgress,
      closedDate: selectedRow.status === Statuses[3] ? new Date() : "",
      clientId: selectedRow.clientId,
      lastChangedDate: new Date(),
    };
    const updates = {};
    updates["/tasks/" + selectedRow.id] = postData;

    update(ref(db), updates);
    onGridReady();
  }, []);

  const cellEditorSelector = (params) => {
    return {
      component: "agRichSelectCellEditor",
      params: {
        values: Statuses,
      },
      popup: true,
    };
  };

  const [rowData, setRowData] = useState();

  const gridParams = {
    checkbox: false,
    username: { rowGroup: true, hide: true, flex: 3, panel: true },
    title: { rowGroup: false, hide: false, flex: 3, panel: false },
    creationDate: { rowGroup: false, hide: true, flex: 1, panel: false },
    description: { rowGroup: false, hide: true, flex: 5, panel: false },
    notes: { rowGroup: false, hide: true, flex: 4, panel: false },
    quantity: { rowGroup: false, hide: false, flex: 1, panel: false },
    unit: { rowGroup: false, hide: true, flex: 1, panel: false },
    costForUnit: { rowGroup: false, hide: true, flex: 1, panel: false },
    totalCost: { rowGroup: false, hide: false, flex: 1, panel: false },
    state: { rowGroup: false, hide: true, flex: 2, panel: true },
    status: {
      rowGroup: true,
      hide: false,
      flex: 2,
      panel: true,
      editable: true,
      cellEditorSelector: cellEditorSelector,
    },
  };
  const columnDefs = gridPainting(gridParams);

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
    get(ref(dbRef, "users"))
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
            if (data[key].state === States.inProgress) {
              let clId = data[key].clientId;
              data[key].id = key;
              data[key] = { ...data[key], ...clientData[clId] };
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

  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: "User",
      field: "username",
      minWidth: 250,
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: {
        checkbox: false,
      },
    };
  }, []);

  const gridStyle = () => {
    return { width: "100%", margin: "auto", flex: 10 };
  };

  return (
    <div className={classes.containerStyle}>
      <span className={classes.formName}>In progress tasks</span>
      <div style={gridStyle()} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection={"multiple"}
          suppressRowClickSelection={false}
          defaultColDef={defaultColDef}
          sideBar={sideBar}
          onGridReady={onGridReady}
          autoGroupColumnDef={autoGroupColumnDef}
          onCellEditingStopped={onCellEditingStopped}
          onRowDoubleClicked={onRowDoubleClicked}
        ></AgGridReact>
        {isOpen && <ViewTask data={data} setIsOpen={setIsOpen} />}
      </div>
    </div>
  );
}

export default InProgressTasksAdmin;

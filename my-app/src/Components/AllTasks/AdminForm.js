import React, { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { getDatabase, ref, get } from "firebase/database";
import ViewTask from "../ViewTask/Main";
import gridPainting from "../../utils/grid";
import { useSharedStyles } from "../../styles/sharedStyles";

function AllTasksAdmin(props) {
  const classes = useSharedStyles();
  const [rowData, setRowData] = useState();
  const [data, setData] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const gridParams = {
    checkbox: false,
    username: { rowGroup: true, hide: true, flex: 3, panel: true },
    title: { rowGroup: false, hide: false, flex: 3, panel: false },
    creationDate: { rowGroup: false, hide: true, flex: 1, panel: false },
    description: { rowGroup: false, hide: true, flex: 5, panel: false },
    notes: { rowGroup: false, hide: true, flex: 4, panel: false },
    quantity: { rowGroup: false, hide: true, flex: 1, panel: false },
    unit: { rowGroup: false, hide: true, flex: 1, panel: false },
    costForUnit: { rowGroup: false, hide: true, flex: 1, panel: false },
    totalCost: { rowGroup: false, hide: false, flex: 1, panel: false },
    state: { rowGroup: true, hide: true, flex: 2, panel: true },
    status: { rowGroup: false, hide: false, flex: 2, panel: false },
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
            let clId = data[key].clientId;
            data[key].id = key;
            data[key] = { ...data[key], ...clientData[clId] };
            dataGrid.push(data[key]);
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
      <span className={classes.formName}>All tasks</span>
      <div style={gridStyle()} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection={"multiple"}
          suppressRowClickSelection={false}
          defaultColDef={defaultColDef}
          sideBar={sideBar}
          onGridReady={onGridReady}
          onRowDoubleClicked={onRowDoubleClicked}
          autoGroupColumnDef={autoGroupColumnDef}
        ></AgGridReact>
        {isOpen && <ViewTask data={data} setIsOpen={setIsOpen} />}
      </div>
    </div>
  );
}

export default AllTasksAdmin;

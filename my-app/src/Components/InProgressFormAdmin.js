import React, { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { createUseStyles } from "react-jss";
import Avatar from "@mui/material/Avatar";
import { getDatabase, ref, get, update } from "firebase/database";

const useStyles = createUseStyles({
  page: {
    backgroundColor: "#e2ebfc",
    justifyContent: "center",
  },
  groupingInputs: {
    display: "flex",
    marginTop: 0,
    width: "100%",
    height: 10,
    justifyContent: "left",
  },
});

function InProgressTasksAdmin(props) {
  const classes = useStyles();

  const containerStyle = () => {
    return { width: "100vw", height: "100vh" };
  };
  const gridStyle = () => {
    return { marginTop: "40px", height: "94vh", width: "100vw" };
  };

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
      state: selectedRow.status === "Done" ? "done" : "inProgress",
      closedDate: selectedRow.status === "Done" ? new Date() : "",
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
        values: ["Waiting", "In progress", "Tasting", "Done"],
      },
      popup: true,
    };
  };

  const [rowData, setRowData] = useState();
  const columnDefs = [
    {
      headerName: " ",
      headerCheckboxSelection: false,
      checkboxSelection: false,
      floatingFilter: false,
      suppressMenu: true,
      minWidth: 55,
      maxWidth: 55,
      width: 55,
      flex: 0,
      resizable: false,
      sortable: false,
      editable: false,
      filter: false,
      suppressColumnsToolPanel: true,
    },
    {
      headerClass: classes.header,
      field: "clientId",
      headerName: "Client ID",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      editable: false,
      hide: true,
      suppressColumnsToolPanel: true,
    },
    {
      headerClass: classes.header,
      field: "user",
      headerName: "User",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      editable: false,
      flex: 1.5,
      rowGroup: true,
      hide: true,
    },
    {
      headerClass: classes.header,
      field: "title",
      headerName: "Task title",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      editable: false,
      flex: 2,
    },
    {
      headerClass: classes.header,
      field: "creationDate",
      headerName: "Creation date",
      columnGroupShow: "closed",
      filter: "agDateColumnFilter",
      editable: false,
      flex: 1,
    },
    {
      headerClass: classes.header,
      field: "lastChangedDate",
      headerName: "Last updated date",
      columnGroupShow: "closed",
      filter: "agDateColumnFilter",
      editable: false,
      flex: 1,
    },
    {
      headerClass: classes.header,
      field: "dueDate",
      headerName: "Due date",
      columnGroupShow: "closed",
      filter: "agDateColumnFilter",
      editable: false,
      flex: 1,
    },
    {
      headerClass: classes.header,
      field: "notes",
      headerName: "Notes",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      editable: false,
      flex: 3,
    },
    {
      headerClass: classes.header,
      field: "quantity",
      headerName: "Due date",
      columnGroupShow: "closed",
      filter: "gsNumberColumnFilter",
      editable: false,
      flex: 1,
    },
    {
      headerClass: classes.header,
      field: "unit",
      headerName: "Unit",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      editable: false,
      flex: 1,
    },
    {
      headerClass: classes.header,
      field: "costForUnit",
      headerName: "Unit cost",
      columnGroupShow: "closed",
      filter: "gsNumberColumnFilter",
      editable: false,
      hide: true,
      suppressColumnsToolPanel: true,
    },
    {
      headerClass: classes.header,
      field: "cost",
      headerName: "Total cost",
      columnGroupShow: "closed",
      filter: "gsNumberColumnFilter",
      editable: false,
      hide: true,
      suppressColumnsToolPanel: true,
    },
    {
      headerClass: classes.header,
      field: "state",
      headerName: "State",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      editable: false,
      hide: true,
      suppressColumnsToolPanel: true,
    },
    {
      headerClass: classes.header,
      field: "status",
      headerName: "Status",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      flex: 1,
      editable: true,
      cellEditorSelector: cellEditorSelector,
    },
  ];
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
            if (data[key].state === "inProgress") {
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
  }, []);

  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: "User",
      field: "user",
      minWidth: 250,
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: {
        checkbox: false,
      },
    };
  }, []);

  return (
    <div className={classes.page}>
      <div style={containerStyle()}>
        <div style={gridStyle()} className="ag-theme-alpine">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            suppressRowClickSelection={false}
            defaultColDef={defaultColDef}
            sideBar={sideBar}
            onGridReady={onGridReady}
            autoGroupColumnDef={autoGroupColumnDef}
            onCellEditingStopped={onCellEditingStopped}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
}

export default InProgressTasksAdmin;

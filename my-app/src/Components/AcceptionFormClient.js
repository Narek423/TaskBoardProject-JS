"use strict";

import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { createUseStyles } from "react-jss";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { View, StyleSheet, Text } from "react-native";
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  push,
  child,
} from "firebase/database";

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
  buttonDiv: {
    margin: 10,
  },
  buttonsClass: {
    length: "3px",
    height: "1px",
  },
  acceptButton: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 8,
    marginBottom: 3,
    appearance: "button",
    backgroundColor: "transparent",
    backgroundImage: "linear-gradient(to bottom, #5b8402, #93e202)",
    border: "0 solid #e5e7eb",
    borderRadius: ".5rem",
    boxSizing: "border-box",
    color: "#482307",
    columnGap: "1rem",
    cursor: "pointer",
    display: "flex",
    fontFamily:
      "ui-sans-serif,system-ui,-apple-system,system-ui,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
    fontSize: "100%",
    fontWeight: "700",
    lineHeight: "3px",
    margin: 0,
    outline: "2px solid transparent",
    padding: "1rem 1.5rem",
    textAlign: "center",
    textTransform: "none",
    transition: "all .1s cubic-bezier(.4, 0, .2, 1)",
    userSelect: "none",
    webkitUserSelect: "none",
    touchAction: "manipulation",
    boxShadow:
      "-6px 8px 10px rgba(81, 41, 10, 0.1), 0px 2px 2px rgba(81, 41, 10, 0.2)",
    "&:active": {
      backgroundColor: "#f3f4f6",
      boxShadow:
        "-1px 2px 5px rgba(81,41,10,0.15),0px 1px 1px rgba(81,41,10,0.15)",
      transform: "translateY(0.125rem)",
    },
    "&:focus": {
      boxShadow:
        "rgba(72, 35, 7, .46) 0 0 0 4px, -6px 8px 10px rgba(81,41,10,0.1), 0px 2px 2px rgba(81,41,10,0.2)",
    },
  },
  rejectButton: {
    marginTop: 8,
    marginBottom: 3,
    appearance: "button",
    backgroundColor: "transparent",
    backgroundImage: "linear-gradient(to bottom, #ae0405, #fa0000)",
    border: "0 solid #e5e7eb",
    borderRadius: ".5rem",
    boxSizing: "border-box",
    color: "#482307",
    columnGap: "1rem",
    cursor: "pointer",
    display: "flex",
    fontFamily:
      "ui-sans-serif,system-ui,-apple-system,system-ui,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
    fontSize: "100%",
    fontWeight: "700",
    lineHeight: "3px",
    margin: 0,
    outline: "2px solid transparent",
    padding: "1rem 1.5rem",
    textAlign: "center",
    textTransform: "none",
    transition: "all .1s cubic-bezier(.4, 0, .2, 1)",
    userSelect: "none",
    webkitUserSelect: "none",
    touchAction: "manipulation",
    boxShadow:
      "-6px 8px 10px rgba(81, 41, 10, 0.1), 0px 2px 2px rgba(81, 41, 10, 0.2)",
    "&:active": {
      backgroundColor: "#f3f4f6",
      boxShadow:
        "-1px 2px 5px rgba(81,41,10,0.15),0px 1px 1px rgba(81,41,10,0.15)",
      transform: "translateY(0.125rem)",
    },
    "&:focus": {
      boxShadow:
        "rgba(72, 35, 7, .46) 0 0 0 4px, -6px 8px 10px rgba(81,41,10,0.1), 0px 2px 2px rgba(81,41,10,0.2)",
    },
  },
});

function PendingToAcception(props) {
  const clientId = "1o0VLmdzrKVav1YaZDxHdoxY3453";
  const classes = useStyles();
  const rowHeight = 50;
  const gridRef = useRef();

  const containerStyle = () => {
    return { width: "100vw", height: "100vh" };
  };
  const gridStyle = () => {
    return { marginTop: "40px", height: "94vh", width: "100vw" };
  };

  const [rowData, setRowData] = useState();
  const [gridApi, setGridApi] = useState("");
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: " ",
      headerCheckboxSelection: true,
      checkboxSelection: true,
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
      hide: true,
      suppressColumnsToolPanel: true,
    },
    {
      headerClass: classes.header,
      field: "title",
      headerName: "Task title",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      flex: 2,
    },
    {
      headerClass: classes.header,
      field: "creationDate",
      headerName: "Creation date",
      columnGroupShow: "closed",
      filter: "agDateColumnFilter",
      flex: 1,
    },
    {
      headerClass: classes.header,
      field: "description",
      headerName: "Task description",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      flex: 4,
    },
    {
      headerClass: classes.header,
      field: "notes",
      headerName: "Notes",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      flex: 3,
    },
    {
      headerClass: classes.header,
      field: "quantity",
      headerName: "Due date",
      columnGroupShow: "closed",
      filter: "gsNumberColumnFilter",
      flex: 1,
    },
    {
      headerClass: classes.header,
      field: "unit",
      headerName: "Unit",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      flex: 1,
    },
    {
      headerClass: classes.header,
      field: "costForUnit",
      headerName: "Unit cost",
      columnGroupShow: "closed",
      filter: "gsNumberColumnFilter",
      flex: 1,
    },
    {
      headerClass: classes.header,
      field: "cost",
      headerName: "Total cost",
      columnGroupShow: "closed",
      filter: "gsNumberColumnFilter",
      flex: 2,
    },
    {
      headerClass: classes.header,
      field: "state",
      headerName: "State",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      hide: true,
      suppressColumnsToolPanel: true,
    },
    {
      headerClass: classes.header,
      field: "status",
      headerName: "Status",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      hide: true,
      suppressColumnsToolPanel: true,
    },
  ]);
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

  const onAcceptRejectBtnClick = function (param) {
    let selectedNodes = gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map((node) => node.data);
    for (let selectedRow of selectedData) {
      const db = getDatabase();
      const postData = {
        title: selectedRow.title,
        description: selectedRow.description,
        notes: selectedRow.notes,
        quantity: selectedRow.quantity,
        costForUnit: selectedRow.costForUnit,
        unit: selectedRow.unit,
        cost: selectedRow.cost,
        status: "waiting",
        state: param.target.innerText === "Accept" ? "inProgress" : "rejected",
        clientId: selectedRow.clientId,
      };
      const updates = {};
      updates["/tasks/" + selectedRow.id] = postData;

      update(ref(db), updates);
      onGridReady();
    }
  };

  const onGridReady = useCallback((params) => {
    if (params) {
      setGridApi(params.api);
    }
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
              data[key].state === "acception"
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

  return (
    <div className={classes.page}>
      <div style={containerStyle()}>
        <div className={classes.groupingInputs}>
          <button
            onClick={onAcceptRejectBtnClick}
            className={classes.acceptButton}
            type="button"
          >
            {" "}
            Accept{" "}
          </button>
          <button
            onClick={onAcceptRejectBtnClick}
            className={classes.rejectButton}
            type="button"
          >
            {" "}
            Reject{" "}
          </button>
        </div>
        <div style={gridStyle()} className="ag-theme-alpine">
          <AgGridReact
            rowHeight={rowHeight}
            rowData={rowData}
            columnDefs={columnDefs}
            rowSelection={"multiple"}
            suppressRowClickSelection={false}
            defaultColDef={defaultColDef}
            sideBar={sideBar}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
}

export default PendingToAcception;

//render(<GridExample></GridExample>, document.querySelector("#root"));

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

const useStyles = createUseStyles({
  page: {
    backgroundColor: "#e2ebfc",
    justifyContent: "center",
  },
  buttonDiv: {
    margin: 10,
  },
  addButton: {
    background: "#FF4742",
    border: "1px solid #FF4742",
    borderRadius: "6px",
    boxShadow: "rgba(0, 0, 0, 0.1) 1px 2px 4px",
    boxSizing: "border-box",
    color: "#FFFFFF",
    cursor: "pointer",
    display: "inline-block",
    fontFamily: "nunito,roboto,proxima-nova,'proxima nova',sans-serif",
    fontSize: "16px",
    fontWeight: 800,
    lineHeight: "16px",
    minHeight: "40px",
    outline: 0,
    padding: "12px 14px",
    textAlign: "center",
    textRendering: "geometricprecision",
    textTransform: "none",
    userSelect: "none",
    webkitUserSelect: "none",
    touchAction: "manipulation",
    verticalAlign: "middle",
    "&:hover": {
      backgroundColor: "initial",
      backgroundPosition: "0 0",
      color: "#FF4742",
    },
    "&:active": {
      backgroundColor: "initial",
      backgroundPosition: "0 0",
      color: "#FF4742",
      opacity: ".5",
    },
  },
  acceptButton: {
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

function FillPandingEvaluation(props) {
  const gridRef = useRef();
  const classes = useStyles();
  const [avatar, setsetAvatar] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [title, setTitle] = useState("");
  const [dataCreated, setDataCreated] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [price, setPrice] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [api, setApi] = useState("");

  const containerStyle = () => {
    return { width: "100vw", height: "100vh" };
  };
  const gridStyle = () => {
    return { height: "100vh", width: "100vw" };
  };
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      headerClass: classes.header,
      field: "avatar",
      headerName: "Avatar",
      columnGroupShow: "closed",
      hide: true,
      suppressColumnsToolPanel: true,
    },
    {
      headerClass: classes.header,
      field: "user",
      headerName: "User",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      hide: true,
      suppressColumnsToolPanel: true,
    },
    {
      headerClass: classes.header,
      field: "email",
      headerName: "Email",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      hide: true,
      suppressColumnsToolPanel: true,
    },
    {
      headerClass: classes.header,
      field: "phoneNumber",
      headerName: "Phone number",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      hide: true,
      suppressColumnsToolPanel: true,
    },
    {
      headerClass: classes.header,
      field: "taskTitle",
      headerName: "Task title",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      flex: 2,
    },
    {
      headerClass: classes.header,
      field: "taskDescription",
      headerName: "Task description",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      flex: 3,
    },
    {
      headerClass: classes.header,
      field: "dataCreated",
      headerName: "Created on",
      columnGroupShow: "closed",
      filter: "agDateColumnFilter",
      flex: 1,
    },
    {
      headerClass: classes.header,
      field: "dueDate",
      headerName: "Due date",
      columnGroupShow: "closed",
      filter: "agDateColumnFilter",
      flex: 1,
    },
    {
      headerClass: classes.header,
      field: "price",
      headerName: "Task price",
      columnGroupShow: "closed",
      filter: "gsNumberColumnFilter",
      flex: 1,
    },
    {
      headerClass: classes.header,
      field: "taxCode",
      headerName: "Tax code",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      hide: true,
      suppressColumnsToolPanel: true,
    },
    {
      header: "column",
      cellRenderer: function (params) {
        return (
          <button className={classes.acceptButton} type="button">
            {" "}
            Accept{" "}
          </button>
        );
      },
    },
    {
      header: "column",
      cellRenderer: function (params) {
        return (
          <button className={classes.rejectButton} type="button">
            {" "}
            Reject{" "}
          </button>
        );
      },
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

  const onGridReady = useCallback((params) => {
    setRowData([
      {
        id: 1,
        avatar: <Avatar alt="Remy Sharp" src="../Avatars/avatar1.jpeg" />,
        user: "Aram",
        email: "aram@gmail.com",
        phoneNumber: "077777777",
      },
      {
        id: 2,
        avatar: <Avatar alt="Remy Sharp" src="../Avatars/avatar2.jpeg" />,
        user: "Vigen",
        email: "vigen@gmail.com",
        phoneNumber: "088888888",
      },

      {
        id: 3,
        avatar: <Avatar alt="Remy Sharp" src="../Avatars/avatar3.jpeg" />,
        user: "Anna",
        email: "anna@gmail.com",
        phoneNumber: "055555555",
      },

      {
        id: 4,
        avatar: <Avatar alt="Remy Sharp" src="../Avatars/avatar1.jpeg" />,
        user: "Sona",
        email: "sona@gmail.com",
        phoneNumber: "098545454",
      },
    ]);
  }, []);

  const onSelectionChanged = useCallback((param) => {
    const selectedRows = param.api.getSelectedRows();
    setsetAvatar(selectedRows.length === 1 ? selectedRows[0].avatar : "");
    setUser(selectedRows.length === 1 ? selectedRows[0].user : "");
    setEmail(selectedRows.length === 1 ? selectedRows[0].email : "");
    setPhoneNumber(
      selectedRows.length === 1 ? selectedRows[0].phoneNumber : ""
    );
    setTitle(selectedRows.length === 1 ? selectedRows[0].title : "");
    setDataCreated(
      selectedRows.length === 1 ? selectedRows[0].dataCreated : ""
    );
    setDescription(
      selectedRows.length === 1 ? selectedRows[0].description : ""
    );
    setDueDate(selectedRows.length === 1 ? selectedRows[0].dueDate : "");
    setPrice(selectedRows.length === 1 ? selectedRows[0].price : "");
    setTaxCode(selectedRows.length === 1 ? selectedRows[0].taxCode : "");
  }, []);

  return (
    <div className={classes.page}>
      <div className={classes.buttonDiv}>
        <button className={classes.addButton} role="button">
          New task
        </button>
      </div>
      <div style={containerStyle()}>
        <div style={gridStyle()} className="ag-theme-alpine">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            rowSelection={"single"}
            suppressRowClickSelection={false}
            defaultColDef={defaultColDef}
            sideBar={sideBar}
            onGridReady={onGridReady}
            onSelectionChanged={onSelectionChanged}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
}

export default FillPandingEvaluation;

//render(<GridExample></GridExample>, document.querySelector("#root"));

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
  container: {
    backgroundColor: "#f9fbff",
    width: "95vw",
    height: "60vh",
    borderColor: "#FF3D00",
    borderWidth: 2,
    borderRadius: 9,
    justifyContent: "center",
  },
  avatar: {
    marginLeft: 20,
    marginTop: 5,
    flex: 1,
  },
  nameText: {
    marginLeft: 0,
    marginTop: 8,
    fontSize: 25,
    flex: 5,
  },
  header: {
    fontFamily: "Palatino",
    fontSize: 15,
  },
  defaultColDef: {
    fontFamily: "Palatino",
    fontSize: 15,
  },
  grouping: {
    display: "flex",
    marginTop: 10,
    backgroundColor: "#e3f6f8",
    width: "90%",
    height: 40,
    borderColor: "#FF3D00",
    borderWidth: 2,
    borderRadius: 9,
    justifyContent: "center",
  },
  groupingName: {
    display: "flex",
    marginTop: 10,
    width: "90%",
    height: 40,
    justifyContent: "center",
  },
  groupingInputs: {
    display: "flex",
    marginTop: 10,
    width: "90%",
    height: 40,
    justifyContent: "left",
  },
  headerText: {
    marginLeft: 20,
    marginTop: 7,
    flex: 1,
  },
  headerValue: {
    marginTop: 7,
    flex: 3,
  },
  TextFieldLeft: {
    marginRight: 10,
    marginTop: 7,
  },
  TextFieldRight: {
    marginTop: 7,
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
      flex: 1,
    },
    {
      headerClass: classes.header,
      field: "user",
      headerName: "User",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      flex: 1.5,
    },
    {
      headerClass: classes.header,
      field: "email",
      headerName: "Email",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      flex: 1.5,
    },
    {
      headerClass: classes.header,
      field: "phoneNumber",
      headerName: "Phone number",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      flex: 1.5,
    },
    {
      headerClass: classes.header,
      field: "taskTitle",
      headerName: "Task title",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      flex: 3.5,
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
      field: "taskDescription",
      headerName: "Task description",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      hide: true,
      suppressColumnsToolPanel: true,
    },
    {
      headerClass: classes.header,
      field: "dueDate",
      headerName: "Due date",
      columnGroupShow: "closed",
      filter: "agDateColumnFilter",
      hide: true,
      suppressColumnsToolPanel: true,
    },
    {
      headerClass: classes.header,
      field: "price",
      headerName: "Task price",
      columnGroupShow: "closed",
      filter: "gsNumberColumnFilter",
      hide: true,
      suppressColumnsToolPanel: true,
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
      <div className={classes.container}>
        <React.Fragment>
          <CssBaseline />
          <Container>
            <Box>
              <div className={classes.groupingName}>
                <div className={classes.avatar}>{avatar}</div>
                <div className={classes.nameText}>{user}</div>
              </div>
              <div className={classes.grouping}>
                <div className={classes.headerText}>Email </div>
                <div className={classes.headerValue}>{email}</div>
              </div>
              <div className={classes.grouping}>
                <div className={classes.headerText}>Phone number </div>
                <div className={classes.headerValue}>{phoneNumber}</div>
              </div>
              <div className={classes.grouping}>
                <div className={classes.headerText}>Tax code </div>
                <div className={classes.headerValue}>{taxCode}</div>
              </div>
              <div className={classes.grouping}>
                <div className={classes.headerText}>Task title </div>
                <div className={classes.headerValue}>{title}</div>
              </div>
              <div className={classes.grouping}>
                <div className={classes.headerText}>Task description </div>
                <div className={classes.headerValue}>{description}</div>
              </div>
              <div className={classes.groupingInputs}>
                <div className={classes.TextFieldLeft}>
                  <TextField
                    className={classes.fields}
                    type={"number"}
                    // onChange={(e) => setPhoneNumber(e.target.value)}
                    id="taskCostId"
                    label="Taks cost"
                    variant="outlined"
                  />
                </div>
                <div className={classes.TextFieldRight}>
                  <TextField
                    className={classes.fields}
                    type={"date"}
                    InputLabelProps={{ shrink: true }}
                    //   onChange={(e) => setDateOfBirth(e.target.value)}
                    id="dueDateId"
                    label="Due date"
                    variant="outlined"
                  />
                </div>
              </div>
            </Box>
          </Container>
        </React.Fragment>
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

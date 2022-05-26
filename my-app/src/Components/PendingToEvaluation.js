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

const useStyles = createUseStyles({
  page: {
    marginTop: 50,
    backgroundColor: "#e2ebfc",
  },
  container: {
    margin: {
      top: "10px",
      right: "20px",
      left: "20px",
      bottom: "10px",
    },
    height: "40vh",
    width: "70vw",
  },
  header: {
    fontFamily: "Palatino",
    fontSize: 15,
  },
  defaultColDef: {
    fontFamily: "Palatino",
    fontSize: 15,
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
    setApi(params.api);
    setRowData([
      {
        id: 1,
        avatar: "#03a9f4",
        user: "Aram",
        email: "aram@gmail.com",
        phoneNumber: "077777777",
      },
      {
        id: 2,
        avatar: "#03a9f4",
        user: "Vigen",
        email: "vigen@gmail.com",
        phoneNumber: "088888888",
      },

      {
        id: 3,
        avatar: "#f44336",
        user: "Anna",
        email: "anna@gmail.com",
        phoneNumber: "055555555",
      },

      {
        id: 4,
        avatar: "#03a9f4",
        user: "Sona",
        email: "sona@gmail.com",
        phoneNumber: "098545454",
      },
    ]);
    // fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
    //   .then((resp) => resp.json())
    //   .then((data) => setRowData(data));
  }, []);

  const onSelectionChanged = useCallback(() => {
    const selectedRows = api.getSelectedRows();
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
          <Container maxWidth="sm">
            <Box sx={{ bgcolor: "#f9fbff", height: "100vh" }}>
              <div className={classes.signUp}>{avatar}</div>
              <div className={classes.signUp}>User {user}</div>
              <div className={classes.signUp}>Email {email}</div>
              <div className={classes.signUp}>Phone number {phoneNumber}</div>
              <div className={classes.signUp}>Task title {title}</div>
              <div className={classes.signUp}>
                Task description {description}
              </div>
              <div className={classes.signUp}>
                <TextField
                  className={classes.fields}
                  type={"number"}
                  // onChange={(e) => setPhoneNumber(e.target.value)}
                  id="taskCostId"
                  label="Taks cost"
                  variant="outlined"
                />
              </div>
              <div className={classes.signUp}>
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
            </Box>
            />
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

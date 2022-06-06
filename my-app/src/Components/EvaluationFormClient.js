import React, { useCallback, useMemo, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { createUseStyles } from "react-jss";
import { getDatabase, ref, get } from "firebase/database";
import { UserAuthContext, useUserAuth } from "../context/UserAuthContext";

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
});

function PendingToEvaluation(props) {
  const classes = useStyles();
  const { user } = useUserAuth(UserAuthContext);
  const clientId = user.uid;

  const containerStyle = () => {
    return { width: "100vw", height: "100vh" };
  };
  const gridStyle = () => {
    return { height: "100vh", width: "100vw" };
  };
  const [rowData, setRowData] = useState();
  const columnDefs = [
    {
      headerClass: classes.header,
      field: "avatar",
      headerName: "Avatar",
      columnGroupShow: "closed",
      flex: 1,
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
      field: "taxCode",
      headerName: "Tax code",
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
      flex: 3.5,
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
      hide: true,
      suppressColumnsToolPanel: true,
    },
    {
      headerClass: classes.header,
      field: "notes",
      headerName: "Notes",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      hide: true,
      suppressColumnsToolPanel: true,
    },
    {
      headerClass: classes.header,
      field: "quantity",
      headerName: "Due date",
      columnGroupShow: "closed",
      filter: "gsNumberColumnFilter",
      hide: true,
      suppressColumnsToolPanel: true,
    },
    {
      headerClass: classes.header,
      field: "unit",
      headerName: "Unit",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      hide: true,
      suppressColumnsToolPanel: true,
    },
    {
      headerClass: classes.header,
      field: "costForUnit",
      headerName: "Unit cost",
      columnGroupShow: "closed",
      filter: "gsNumberColumnFilter",
      hide: true,
      suppressColumnsToolPanel: true,
    },
    {
      headerClass: classes.header,
      field: "cost",
      headerName: "Total cost",
      columnGroupShow: "closed",
      filter: "gsNumberColumnFilter",
      hide: true,
      suppressColumnsToolPanel: true,
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
              data[key].state === "evaluation"
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
        <div style={gridStyle()} className="ag-theme-alpine">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            rowSelection={"single"}
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

export default PendingToEvaluation;

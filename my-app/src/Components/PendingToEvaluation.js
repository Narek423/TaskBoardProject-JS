"use strict";

import React, { useCallback, useMemo, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

function useCurrentWidth() {
  let [width, setWidth] = useState(getWidth());
  useEffect(() => {
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setWidth(getWidth()), 150);
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return width;
}

function FillPandingEvaluation(props) {
  let width = useCurrentWidth();
  width = width + 1;
  console.log(width + "px");
  const containerStyle = useMemo(
    () => ({ width: width + "px", height: "100vh" }),
    []
  );
  const gridStyle = useMemo(
    () => ({ height: "100vh", width: width + "px" }),
    []
  );
  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    {
      field: "avatar",
      headerName: "Avatar",
      columnGroupShow: "closed",
      width: (width - 35) * 0.1,
      flex: 0,
    },
    {
      field: "user",
      headerName: "User",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      width: (width - 35) * 0.15,
      flex: 0,
    },
    {
      field: "email",
      headerName: "Email",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      width: (width - 35) * 0.15,
      flex: 0,
    },
    {
      field: "phone",
      headerName: "Phone",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      width: (width - 35) * 0.15,
      flex: 0,
    },
    {
      field: "task",
      headerName: "Task title",
      columnGroupShow: "closed",
      filter: "agTextColumnFilter",
      width: (width - 35) * 0.35,
      flex: 0,
    },
    {
      field: "dataCreated",
      headerName: "Created on",
      columnGroupShow: "closed",
      filter: "agDateColumnFilter",
      width: (width - 35) * 0.1,
      flex: 0,
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
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
      toolPanels: ["columns", "filters"],
      defaultToolPanel: "",
    };
  }, []);

  const onGridReady = useCallback((params) => {
    setRowData([
      {
        id: 1,
        avatar: "#03a9f4",
        user: "Aram",
        email: "aram@gmail.com",
        phone: "077777777",
      },
      {
        id: 2,
        avatar: "#03a9f4",
        user: "Vigen",
        email: "vigen@gmail.com",
        phone: "088888888",
      },

      {
        id: 3,
        avatar: "#f44336",
        user: "Anna",
        email: "anna@gmail.com",
        phone: "055555555",
      },

      {
        id: 4,
        avatar: "#03a9f4",
        user: "Sona",
        email: "sona@gmail.com",
        phone: "098545454",
      },
    ]);
    // fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
    //   .then((resp) => resp.json())
    //   .then((data) => setRowData(data));
  }, []);

  return (
    <>
      <div style={containerStyle}>
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            rowSelection={"multiple"}
            suppressRowClickSelection={true}
            defaultColDef={defaultColDef}
            sideBar={sideBar}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
    </>
  );
}

export default FillPandingEvaluation;

//render(<GridExample></GridExample>, document.querySelector("#root"));

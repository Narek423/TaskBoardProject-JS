import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { getDatabase, ref, get, update } from "firebase/database";
import { useSharedStyles } from "../../styles/sharedStyles";
import ViewTask from "../ViewTask/Main";
import Rolls from "../../constants/Rolls";
import adminApprovingGridPainting from "../../utils/adminApprovingGrid";

function ApprovingAdminProfile(props) {
  const classes = useSharedStyles();
  const [rowData, setRowData] = useState();
  const [gridApi, setGridApi] = useState("");
  const [data, setData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const gridParams = {
    checkbox: true,
    username: { rowGroup: false, hide: false, flex: 2, panel: true },
    name: { rowGroup: false, hide: false, flex: 1, panel: true },
    lastName: { rowGroup: false, hide: false, flex: 1, panel: true },
    email: { rowGroup: false, hide: false, flex: 2, panel: true },
    phoneNumber: { rowGroup: false, hide: false, flex: 1, panel: true },
    taxCode: { rowGroup: false, hide: false, flex: 1, panel: true },
    dateOfBirth: { rowGroup: false, hide: false, flex: 1, panel: true },
    roll: { rowGroup: false, hide: true, flex: 0, panel: false },
  };
  const columnDefs = adminApprovingGridPainting(gridParams);
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

  const onAcceptRejectBtnClick = function (param) {
    let selectedNodes = gridApi.getSelectedNodes();
    let selectedData = selectedNodes.map((node) => node.data);
    for (let selectedRow of selectedData) {
      const db = getDatabase();
      const postData = {
        username: selectedRow.username,
        name: selectedRow.name,
        lastName: selectedRow.lastName,
        phoneNumber: selectedRow.phoneNumber,
        taxCode: selectedRow.taxCode,
        dateOfBirth: selectedRow.dateOfBirth,
        enabled: param.target.innerText === "Accept" ? "true" : "disabled",
        email: selectedRow.email,
        roll: selectedRow.roll,
      };
      const updates = {};
      updates["/users/" + selectedRow.id] = postData;

      update(ref(db), updates);
      onGridReady(selectedRow.id);
    }
  };

  const onGridReady = (params) => {
    const { Admin } = Rolls;
    if (params) {
      setGridApi(params.api);
    }
    const dbRef = getDatabase();
    let dataGrid = [];
    let clientData = {};
    get(ref(dbRef, "users"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          clientData = snapshot.val();
        }
        for (let key in clientData) {
          if (
            clientData[key].roll === Admin &&
            clientData[key].enabled === false
          ) {
            clientData[key].id = key;
            clientData[key] = { ...clientData[key] };
            dataGrid.push(clientData[key]);
          }
        }

        setRowData(dataGrid);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const gridStyle = () => {
    return { width: "100%", margin: "auto", flex: 10 };
  };

  return (
    <div className={classes.containerStyle}>
      <span className={classes.formName}>Admin user requsts</span>
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
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection={"multiple"}
          suppressRowClickSelection={false}
          defaultColDef={defaultColDef}
          sideBar={sideBar}
          onGridReady={onGridReady}
        ></AgGridReact>
        {isOpen && <ViewTask data={data} setIsOpen={setIsOpen} />}
      </div>
    </div>
  );
}

export default ApprovingAdminProfile;

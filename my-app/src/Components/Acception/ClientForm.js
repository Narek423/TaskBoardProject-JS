import React, { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { createUseStyles } from "react-jss";
import { getDatabase, ref, get, update } from "firebase/database";
import { UserAuthContext, useUserAuth } from "../../context/UserAuthContext";
import { sharedStyles } from "../../styles/sharedStyles";
import Statuses from "../../constants/Statuses";
import States from "../../constants/States";
import ViewTask from "../ViewTask/Main";
import gridPainting from "../../utils/grid";

function PendingToAcception(props) {
  const classes = sharedStyles;
  const { user } = useUserAuth(UserAuthContext);
  const clientId = user.uid;
  const [rowData, setRowData] = useState();
  const [gridApi, setGridApi] = useState("");
  const [data, setData] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const gridParams = {
    checkbox: true,
    username: { rowGroup: false, hide: true, flex: 3, panel: true },
    title: { rowGroup: false, hide: false, flex: 3, panel: false },
    creationDate: { rowGroup: false, hide: false, flex: 1, panel: false },
    description: { rowGroup: false, hide: true, flex: 5, panel: false },
    notes: { rowGroup: false, hide: true, flex: 4, panel: false },
    quantity: { rowGroup: false, hide: false, flex: 1, panel: false },
    unit: { rowGroup: false, hide: false, flex: 1, panel: false },
    costForUnit: { rowGroup: false, hide: false, flex: 1, panel: false },
    totalCost: { rowGroup: false, hide: false, flex: 1, panel: false },
    state: { rowGroup: false, hide: true, flex: 2, panel: true },
    status: { rowGroup: false, hide: true, flex: 2, panel: true },
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
        status: Statuses[1],
        state:
          param.target.innerText === "Accept"
            ? States.inProgress
            : States.rejected,
        clientId: selectedRow.clientId,
      };
      const updates = {};
      updates["/tasks/" + selectedRow.id] = postData;

      update(ref(db), updates);
      onGridReady();
    }
  };

  const onRowDoubleClicked = useCallback((param) => {
    const selectedRow = param.api.getSelectedRows();
    if (selectedRow.length === 1) {
      setData(selectedRow[0]);
      setIsOpen(true);
    }
  }, []);

  const onGridReady = (params) => {
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
              data[key].state === States.acception
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
  };

  return (
    <div style={classes.containerStyle}>
      <span style={classes.formName}>Tasks for acception</span>
      <div style={classes.groupingInputs}>
        <button
          onClick={onAcceptRejectBtnClick}
          style={classes.acceptButton}
          type="button"
        >
          {" "}
          Accept{" "}
        </button>
        <button
          onClick={onAcceptRejectBtnClick}
          style={classes.rejectButton}
          type="button"
        >
          {" "}
          Reject{" "}
        </button>
      </div>
      <div style={classes.gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection={"multiple"}
          suppressRowClickSelection={false}
          defaultColDef={defaultColDef}
          sideBar={sideBar}
          onGridReady={onGridReady}
          onRowDoubleClicked={onRowDoubleClicked}
        ></AgGridReact>
        {isOpen && <ViewTask data={data} setIsOpen={setIsOpen} />}
      </div>
    </div>
  );
}

export default PendingToAcception;

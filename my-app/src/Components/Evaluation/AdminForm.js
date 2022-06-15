import React, { useCallback, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { createUseStyles } from "react-jss";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { getDatabase, ref, get, update } from "firebase/database";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import States from "../../constants/States";
import Statuses from "../../constants/Statuses";
import ViewTask from "../ViewTask/Main";
import gridPainting from "../../utils/grid";
import { useSharedStyles } from "../../styles/sharedStyles";

function PendingToEvaluationAdmin(props) {
  const units = [
    { unit: "hour", cost: 20000 },
    { unit: "unit", cost: 0 },
  ];
  const classes = useSharedStyles();
  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [title, setTitle] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [costForUnit, setCostForUnit] = useState(20000);
  const [unit, setUnit] = useState(units[0]);
  const [quantity, setQuantity] = useState(0);
  const [cost, setCost] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [clientId, setClientId] = useState("");
  const [data, setData] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const gridStyle = () => {
    return { width: "100%", margin: "auto", flex: 10 };
  };
  const [rowData, setRowData] = useState();

  const gridParams = {
    checkbox: false,
    username: { rowGroup: true, hide: true, flex: 3, panel: true },
    title: { rowGroup: false, hide: false, flex: 3, panel: false },
    creationDate: { rowGroup: false, hide: false, flex: 1, panel: false },
    description: { rowGroup: false, hide: false, flex: 5, panel: false },
    notes: { rowGroup: false, hide: false, flex: 4, panel: false },
    quantity: { rowGroup: false, hide: true, flex: 1, panel: true },
    unit: { rowGroup: false, hide: true, flex: 1, panel: true },
    costForUnit: { rowGroup: false, hide: true, flex: 1, panel: true },
    totalCost: { rowGroup: false, hide: true, flex: 1, panel: true },
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
  }, [classes.defaultColDef]);

  const sideBar = useMemo(() => {
    return {
      defaultColDef,
      toolPanels: ["columns", "filters"],
      defaultToolPanel: "",
    };
  }, [defaultColDef]);

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
            if (data[key].state === States.evaluation) {
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
  };
  const onSaveBtnClick = async (e) => {
    if (title !== "" && clientId !== "") {
      const db = getDatabase();
      const postData = {
        title: title,
        description: description,
        notes: notes,
        dueDate: dueDate,
        creationDate: creationDate,
        quantity: quantity,
        costForUnit: costForUnit,
        unit: unit.unit || unit,
        cost: cost,
        status: Statuses[0],
        state: States.acception,
        clientId: clientId,
      };

      const updates = {};
      updates["/tasks/" + id] = postData;

      update(ref(db), updates);
      return onGridReady();
    }
  };

  const onRowDoubleClicked = useCallback((param) => {
    const selectedRow = param.api.getSelectedRows();
    if (selectedRow.length === 1) {
      setData(selectedRow[0]);
      setIsOpen(true);
    }
  }, []);

  const onSelectionChanged = useCallback((param) => {
    const selectedRows = param.api.getSelectedRows();
    if (selectedRows.length === 1) {
      setAvatar(selectedRows[0].avatar || "");
      setUsername(selectedRows[0].username);
      setClientId(selectedRows[0].clientId);
      setEmail(selectedRows[0].email);
      setPhoneNumber(selectedRows[0].phoneNumber || "");
      setTitle(selectedRows[0].title || "");
      setCreationDate(selectedRows[0].creationDate || "");
      setNotes(selectedRows[0].notes || "");
      setId(selectedRows[0].id);
      setDescription(selectedRows[0].description || "");
      setDueDate(selectedRows[0].dueDate || "");
      if (selectedRows[0].costForUnit) {
        setCostForUnit(selectedRows[0].costForUnit);
      }
      if (selectedRows[0].unit) {
        setUnit(selectedRows[0].unit || "");
      }
      setQuantity(selectedRows[0].quantity);
      setCost(selectedRows[0].cost || "");
      setTaxCode(selectedRows[0].taxCode || "");
    }
  }, []);

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

  return (
    <div className={classes.containerStyle}>
      <span className={classes.formName}>Evaluation tasks</span>
      <div className={classes.containerEvaluation}>
        <React.Fragment>
          <CssBaseline />
          <Container>
            <Box>
              <div className={classes.groupingInputsEvaluation}>
                <div className={classes.TextFieldLeftAvatar}>
                  <div className={classes.groupingName}>
                    <div className={classes.avatar}>{avatar}</div>
                    <div className={classes.nameText}>{username}</div>
                  </div>
                </div>
                <div className={classes.TextFieldRightTitle}>
                  <div className={classes.grouping}>
                    <div className={classes.headerValue}>
                      Task title {title}
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.groupingInputsEvaluation}>
                <div className={classes.TextFieldLeft}>
                  <div className={classes.grouping}>
                    <div className={classes.headerValue}>Email {email}</div>
                  </div>
                </div>
                <div className={classes.TextFieldLeft}>
                  <div className={classes.grouping}>
                    <div className={classes.headerValue}>
                      Phone number {phoneNumber}
                    </div>
                  </div>
                </div>
                <div className={classes.TextFieldRight}>
                  <div className={classes.grouping}>
                    <div className={classes.headerValue}>
                      Tax code {taxCode}
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.groupingInputsCard}>
                <div className={classes.TextFieldLeft}>
                  <div className={classes.grouping}>
                    <Card
                      sx={{
                        width: "100%",
                        height: "20vh",
                        overflowY: "scroll",
                      }}
                    >
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Task description
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
              <div className={classes.groupingInputsFields}>
                <div className={classes.TextFieldLeft}>
                  <TextField
                    className={classes.fields}
                    type={"number"}
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                      setCost(e.target.value * costForUnit);
                    }}
                    id="quantityId"
                    label="Quantity"
                    variant="outlined"
                  />
                </div>
                <div className={classes.TextFieldLeft}>
                  <TextField
                    className={classes.fields}
                    type={"number"}
                    value={costForUnit}
                    onChange={(e) => {
                      setCostForUnit(e.target.value);
                      setCost(e.target.value * quantity);
                    }}
                    id="costForUnit"
                    label="Cost for unit"
                    variant="outlined"
                  />
                </div>
                <div className={classes.TextFieldLeft}>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="unitLabelId">Unit</InputLabel>
                      <Select
                        labelId="inputUnitId"
                        id="UnitId"
                        value={unit.unit || unit}
                        label="Unit"
                        onChange={(e) => {
                          let val = units.find(
                            (element) => element.unit === e.target.value
                          );
                          setUnit(val);
                          setCostForUnit(val.cost);
                          setCost(val.cost * quantity);
                        }}
                      >
                        {units.map((element) => (
                          <MenuItem value={element.unit}>
                            {element.unit}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <div className={classes.TextFieldLeft}>
                  <TextField
                    className={classes.fields}
                    type={"number"}
                    value={cost}
                    onChange={(e) => {
                      setCost(e.target.value);
                      setCostForUnit(
                        !!quantity === undefined
                          ? e.target.value
                          : e.target.value / quantity
                      );
                      setQuantity(!!quantity === undefined ? 1 : quantity);
                    }}
                    id="taskCostId"
                    label="Total cost"
                    variant="outlined"
                  />
                </div>
                <div className={classes.TextFieldLeft}>
                  <TextField
                    className={classes.fields}
                    type={"date"}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setDueDate(e.target.value)}
                    id="dueDateId"
                    label="Due date"
                    variant="outlined"
                  />
                </div>
                <div className={classes.TextFieldRight}>
                  <button
                    className={classes.saveButton}
                    onClick={onSaveBtnClick}
                  >
                    Save
                  </button>
                </div>
              </div>
            </Box>
          </Container>
        </React.Fragment>
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
          onSelectionChanged={onSelectionChanged}
          onRowDoubleClicked={onRowDoubleClicked}
          autoGroupColumnDef={autoGroupColumnDef}
        ></AgGridReact>
        {isOpen && <ViewTask data={data} setIsOpen={setIsOpen} />}
      </div>
    </div>
  );
}

export default PendingToEvaluationAdmin;

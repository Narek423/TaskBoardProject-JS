import {
  Box,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material";
import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { createUseStyles } from "react-jss";
import { useSharedStyles } from "../../styles/sharedStyles";
//import { ModalStyle } from "../../styles/modalStyle";

const useStyles = createUseStyles({
  darkBG: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    width: "100vw",
    height: "100vh",
    zIndex: 0,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
  },

  centered: {
    position: "fixed",
    width: "90%",
    top: "5%",
    left: "5%",
    // transform: "translate(-10%, -10%)",
  },

  modal: {
    width: "90%",
    height: "90vh",
    background: "white",
    color: "white",
    zIndex: "10",
    borderRadius: "16px",
    boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.04)",
  },

  modalHeader: {
    height: "90px",
    background: "white",
    overflow: "hidden",
    borderTopLeftRadius: "16px",
    borderTopRightRadius: "16px",
  },

  heading: {
    margin: 0,
    padding: "10px",
    color: "#2c3e50",
    fontWeight: 500,
    fontSize: "18px",
    textAlign: "center",
  },

  modalContent: {
    padding: "10px",
    fontSize: "14px",
    color: "#2c3e50",
    textAlign: "center",
  },

  modalActions: {
    position: "absolute",
    bottom: "2px",
    marginBottom: "10px",
    width: "100%",
  },

  actionsContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  page: {
    backgroundColor: "#e2ebfc",
    justifyContent: "center",
    height: "100vh",
  },
  container: {
    backgroundColor: "#f9fbff",
    width: "95%",
    height: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 0,
    marginBottom: 0,
    borderColor: "#FF3D00",
    borderWidth: 2,
    borderRadius: 9,
    justifyContent: "center",
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
    backgroundColor: "red",
  },
  grouping: {
    display: "flex",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#e3f6f8",
    width: "100%",
    height: 40,
    borderColor: "#FF3D00",
    borderWidth: 2,
    borderRadius: 9,
    justifyContent: "center",
  },
  groupingName: {
    display: "flex",
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    height: 40,
    justifyContent: "center",
  },
  groupingInputs: {
    display: "flex",
    marginTop: 0,
    marginBottom: 10,
    width: "100%",
    height: 40,
    justifyContent: "left",
  },
  groupingInputsFields: {
    marginTop: 20,
    marginBottom: 20,
  },
  groupingInputsCard: {
    display: "flex",
    width: "100%",
    height: "20vh",
    justifyContent: "left",
  },
  headerText: {
    marginLeft: 20,
    marginTop: 7,
    flex: 1,
  },
  headerValue: {
    marginLeft: 20,
    marginTop: 7,
    flex: 1,
  },
  TextFieldLeft: {
    marginRight: 10,
    marginTop: 7,
    flex: 1,
  },
  TextFieldRight: {
    marginTop: 7,
    marginRight: 10,
    flex: 1,
  },
  TextFieldLeftAvatar: {
    marginRight: 10,
    marginTop: 7,
    flex: 1,
  },
  TextFieldRightTitle: {
    marginRight: 10,
    marginTop: 7,
    flex: 2,
  },
  closeBtn: {
    cursor: "pointer",
    fontWeight: 500,
    padding: "4px 8px",
    borderRadius: "8px",
    border: "none",
    fontSize: "18px",
    color: "#2c3e50",
    background: "white",
    transition: "all 0.25s ease",
    boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.06)",
    position: "absolute",
    right: 0,
    top: 0,
    alignSelf: "flex-end,",
    marginTop: "-7px",
    marginRight: "-7px",
    "&:hover": {
      boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.04)",
      transform: "translate(-4px, 4px)",
    },
  },
});

const AdminForm = ({ setIsOpen, data }) => {
  console.log("data", data);
  const ModalStyle = useStyles();
  const classes = useSharedStyles();
  return (
    <>
      <div className={ModalStyle.darkBG} onClick={() => setIsOpen(false)} />
      <div className={ModalStyle.centered}>
        <div className={ModalStyle.modal}>
          <div className={ModalStyle.modalHeader}>
            <h5 className={ModalStyle.heading}>{data.title}</h5>
          </div>
          <button
            className={ModalStyle.closeBtn}
            onClick={() => setIsOpen(false)}
          >
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={ModalStyle.modalContent}>
            <div className={`${classes.containerEvaluation}`}>
              <React.Fragment>
                <CssBaseline />
                <Container>
                  <Box>
                    <div className={classes.groupingInputs}>
                      <div className={classes.TextFieldLeftAvatar}>
                        <div className={classes.groupingName}>
                          <div className={classes.avatar}>{data.avatar}</div>
                          <div className={classes.nameText}>
                            {data.username}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.groupingInputs}>
                      <div className={classes.TextFieldLeft}>
                        <div className={classes.grouping}>
                          <div className={classes.headerValue}>
                            Email {data.email}
                          </div>
                        </div>
                      </div>
                      <div className={classes.TextFieldLeft}>
                        <div className={classes.grouping}>
                          <div className={classes.headerValue}>
                            Phone number {data.phoneNumber}
                          </div>
                        </div>
                      </div>
                      <div className={classes.TextFieldRight}>
                        <div className={classes.grouping}>
                          <div className={classes.headerValue}>
                            Tax code {data.taxCode}
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
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                Task description
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {data.description}
                              </Typography>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                    <div className={classes.groupingInputsFields}>
                      <div className={classes.groupingInputs}>
                        <div className={classes.TextFieldLeft}>
                          <div className={classes.grouping}>
                            <div className={classes.headerValue}>
                              Quantity {data.quantity}
                            </div>
                          </div>
                        </div>
                        <div className={classes.TextFieldLeft}>
                          <div className={classes.grouping}>
                            <div className={classes.headerValue}>
                              Unit {data.unit}
                            </div>
                          </div>
                        </div>
                        <div className={classes.TextFieldRight}>
                          <div className={classes.grouping}>
                            <div className={classes.headerValue}>
                              Cost for unit {data.costForUnit}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={classes.groupingInputs}>
                        <div className={classes.TextFieldLeft}>
                          <div className={classes.grouping}>
                            <div className={classes.headerValue}>
                              Total cost {data.totalCost}
                            </div>
                          </div>
                        </div>
                        <div className={classes.TextFieldLeft}>
                          <div className={classes.grouping}>
                            <div className={classes.headerValue}>
                              Due date {data.dueDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Box>
                </Container>
              </React.Fragment>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminForm;

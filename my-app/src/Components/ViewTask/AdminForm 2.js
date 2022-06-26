import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSharedStyles } from "../../styles/sharedStyles";
import {
  Box,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material";

const AdminForm = ({ setIsOpen, data, open = true }) => {
  const theme = useTheme();
  const classes = useSharedStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        style={{ maxWidth: "xl" }}
      >
        <DialogTitle id="responsive-dialog-title">{data.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div className={`${classes.containerView}`}>
              <React.Fragment>
                <CssBaseline />
                <Container>
                  <Box>
                    <div className={classes.groupingInputsView}>
                      <div className={classes.TextFieldLeftAvatar}>
                        <div className={classes.avatar}>{data.avatar}</div>
                        <div className={classes.nameText}>{data.username}</div>
                      </div>
                    </div>
                    <div className={classes.groupingInputsEvaluation}>
                      <div className={classes.TextFieldLeft}>
                        <div className={classes.groupingView}>
                          <div className={classes.headerValue}>
                            Email {data.email}
                          </div>
                        </div>
                      </div>
                      <div className={classes.TextFieldLeft}>
                        <div className={classes.groupingView}>
                          <div className={classes.headerValue}>
                            Phone number {data.phoneNumber}
                          </div>
                        </div>
                      </div>
                      <div className={classes.TextFieldRight}>
                        <div className={classes.groupingView}>
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
                      <div className={classes.groupingInputsView}>
                        <div className={classes.TextFieldLeft}>
                          <div className={classes.groupingView}>
                            <div className={classes.headerValue}>
                              Quantity {data.quantity}
                            </div>
                          </div>
                        </div>
                        <div className={classes.TextFieldLeft}>
                          <div className={classes.groupingView}>
                            <div className={classes.headerValue}>
                              Unit {data.unit}
                            </div>
                          </div>
                        </div>
                        <div className={classes.TextFieldRight}>
                          <div className={classes.groupingView}>
                            <div className={classes.headerValue}>
                              Cost for unit {data.costForUnit}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.groupingInputsFields}>
                      <div className={classes.groupingInputsView}>
                        <div className={classes.TextFieldLeft}>
                          <div className={classes.groupingView}>
                            <div className={classes.headerValue}>
                              Total cost {data.totalCost}
                            </div>
                          </div>
                        </div>
                        <div className={classes.TextFieldLeft}>
                          <div className={classes.groupingView}>
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
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminForm;

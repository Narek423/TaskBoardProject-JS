import * as React from "react";
import { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSharedStyles } from "../../styles/sharedStyles";
import { Alert, Box, Container, Stack, TextField } from "@mui/material";
import { getDatabase, ref, update } from "firebase/database";
import formatPhoneNumber from "../../utils/formatPhoneNumber";
import formatTaxCode from "../../utils/formatTaxCode";

function Form({ data }) {
  const theme = useTheme();
  const classes = useSharedStyles();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(data.dateOfBirth);
  const [taxCode, setTaxCode] = useState(formatTaxCode(data.taxCode));
  const [nameError, setNameError] = useState(false);
  const [lastNameError, setlastNameError] = useState(false);
  const [countError, setCountError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(
    formatPhoneNumber(data.phoneNumber)
  );
  const [name, setName] = useState(data.name);
  const [lastName, setLastName] = useState(data.lastName);
  const errorMsg = {
    code: 403,
    message: "Invalid input! Please enter valid credential.",
  };

  useEffect(() => {
    const timeId = setTimeout(() => {
      setSuccess(false);
      setError(false);
    }, 1500);

    return () => {
      clearTimeout(timeId);
    };
  }, [success, error]);

  const phoneHandleInput = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhoneNumber(formattedPhoneNumber);
  };

  const taxCodeHandleInput = (e) => {
    const formattedTaxCode = formatTaxCode(e.target.value);
    setTaxCode(formattedTaxCode);
  };

  const onSaveBtnClick = async (e) => {
    if (data.clientId !== "") {
      setNameError(false);
      setlastNameError(false);
      setCountError("");
      if (name.length < 4 || lastName.length < 4) {
        if (lastName.length < 4) {
          setlastNameError(true);
          setCountError("Last name must be at least 4 character.");
        }
        if (name.length < 4) {
          setNameError(true);
          setCountError("Name must be at least 4 character.");
        }
        setSuccess(false);
        setError(true);
        throw errorMsg;
      }
      data.name = name;
      data.lastName = lastName;
      data.phoneNumber = phoneNumber;
      data.dateOfBirth = dateOfBirth;
      data.taxCode = taxCode;
      const db = getDatabase();
      const postData = {
        username: data.username,
        name: name,
        lastName: lastName,
        email: data.email,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
        taxCode: taxCode,
        roll: data.roll,
        enabled: data.enabled,
      };

      const updates = {};
      updates["/users/" + data.clientId] = postData;

      return update(ref(db), updates)
        .then(() => {
          setSuccess(true);
          setError(false);
        })
        .catch((error) => {
          console.error(error);
          setSuccess(false);
          setError(true);
        });
    }
  };

  return (
    <div className={classes.containerStyle}>
      <span className={classes.formName}>Profile</span>
      <div className={classes.containerProfile}>
        <React.Fragment>
          <Container>
            <Box>
              <div className={classes.groupingInputsEvaluation}>
                <div className={classes.avatar}>{data.avatar}</div>
              </div>
              <div className={!smallScreen && classes.groupingInputsEvaluation}>
                <div className={!smallScreen && classes.groupingName}>
                  <div className={classes.groupingViewLeft}>
                    {data.username}
                  </div>
                  <div className={classes.groupingViewRight}>
                    Email {data.email}
                  </div>
                </div>
              </div>

              <div className={!smallScreen && classes.margin}></div>
              <div className={!smallScreen && classes.groupingInputsView}>
                <div className={classes.groupingViewLeft}>
                  <TextField
                    error={nameError}
                    className={classes.fields}
                    type={"text"}
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    id="nameId"
                    label="Name"
                    variant="outlined"
                  />
                </div>
                <div className={classes.groupingViewLeft}>
                  <TextField
                    error={lastNameError}
                    className={classes.fields}
                    type={"text"}
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    id="lastNameId"
                    label="Last name"
                    variant="outlined"
                  />
                </div>
                <div className={classes.groupingViewRight}>
                  <TextField
                    className={classes.fields}
                    type={"text"}
                    onChange={(e) => {
                      phoneHandleInput(e);
                    }}
                    value={phoneNumber}
                    id="phoneNumberId"
                    label="Phone number"
                    variant="outlined"
                  />
                </div>
              </div>
              <div className={!smallScreen && classes.margin2}></div>
              <div className={!smallScreen && classes.groupingInputsView}>
                <div className={classes.groupingViewLeft}>
                  <TextField
                    className={classes.fields}
                    type={"date"}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    value={dateOfBirth}
                    id="dateOfBirthId"
                    label="Date of birth"
                    variant="outlined"
                  />
                </div>
                <div className={classes.groupingViewRight}>
                  <TextField
                    className={classes.fields}
                    type={"text"}
                    onChange={(e) => {
                      taxCodeHandleInput(e);
                    }}
                    value={taxCode}
                    id="taxCodeId"
                    label="Tax code"
                    variant="outlined"
                  />
                </div>
              </div>
              <div className={!smallScreen && classes.groupingInputsView}>
                <div className={classes.groupingViewRigth}>
                  <button
                    className={classes.saveButton}
                    onClick={onSaveBtnClick}
                  >
                    Save
                  </button>
                </div>
              </div>
              {success && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert variant="outlined" severity="success">
                    Data saved successfully !
                  </Alert>
                </Stack>
              )}
              {error && (
                <Stack sx={{ width: "100%" }} spacing={2}>
                  <Alert variant="outlined" severity="error">
                    {countError || "An error occurred. Please try again later!"}
                    "
                  </Alert>
                </Stack>
              )}
            </Box>
          </Container>
        </React.Fragment>
      </div>
    </div>
  );
}

export default Form;

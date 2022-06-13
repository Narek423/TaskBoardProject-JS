import { createUseStyles } from "react-jss";

const container = {
  backgroundColor: "#f9fbff",
  width: "95vw",
  height: "60vh",
  borderColor: "#FF3D00",
  borderWidth: 2,
  borderRadius: 9,
  justifyContent: "center",
};
const groupingInputs = {
  display: "flex",
  marginTop: 0,
  width: "100%",
  height: 10,
  justifyContent: "left",
};
const containerStyle = {
  width: "100%",
  height: "100%",
  backgroundColor: "#e2ebfc",
  justifyContent: "center",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
};
const gridStyle = {
  width: "100%",
  margin: "auto",
  flex: 10,
};

const header = {
  justifyContent: "center",
  fontFamily: "Palatino",
  fontSize: 15,
};

const buttonDiv = {
  margin: 10,
};
const buttonsClass = {
  length: "3px",
  height: "1px",
};
const acceptButton = {
  marginLeft: 10,
  marginRight: 10,
  marginTop: 8,
  marginBottom: 3,
  appearance: "button",
  backgroundColor: "transparent",
  backgroundImage: "linear-gradient(to bottom, #5b8402, #93e202)",
  border: "0 solid #e5e7eb",
  borderRadius: ".5rem",
  boxSizing: "border-box",
  color: "#482307",
  columnGap: "1rem",
  cursor: "pointer",
  display: "flex",
  fontFamily:
    "ui-sans-serif,system-ui,-apple-system,system-ui,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
  fontSize: "100%",
  fontWeight: "700",
  lineHeight: "3px",
  margin: 0,
  outline: "2px solid transparent",
  padding: "1rem 1.5rem",
  textAlign: "center",
  textTransform: "none",
  transition: "all .1s cubic-bezier(.4, 0, .2, 1)",
  userSelect: "none",
  webkitUserSelect: "none",
  touchAction: "manipulation",
  boxShadow:
    "-6px 8px 10px rgba(81, 41, 10, 0.1), 0px 2px 2px rgba(81, 41, 10, 0.2)",
  "&:active": {
    backgroundColor: "#f3f4f6",
    boxShadow:
      "-1px 2px 5px rgba(81,41,10,0.15),0px 1px 1px rgba(81,41,10,0.15)",
    transform: "translateY(0.125rem)",
  },
  "&:focus": {
    boxShadow:
      "rgba(72, 35, 7, .46) 0 0 0 4px, -6px 8px 10px rgba(81,41,10,0.1), 0px 2px 2px rgba(81,41,10,0.2)",
  },
};
const rejectButton = {
  marginTop: 8,
  marginBottom: 3,
  appearance: "button",
  backgroundColor: "transparent",
  backgroundImage: "linear-gradient(to bottom, #ae0405, #fa0000)",
  border: "0 solid #e5e7eb",
  borderRadius: ".5rem",
  boxSizing: "border-box",
  color: "#482307",
  columnGap: "1rem",
  cursor: "pointer",
  display: "flex",
  fontFamily:
    "ui-sans-serif,system-ui,-apple-system,system-ui,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
  fontSize: "100%",
  fontWeight: "700",
  lineHeight: "3px",
  margin: 0,
  outline: "2px solid transparent",
  padding: "1rem 1.5rem",
  textAlign: "center",
  textTransform: "none",
  transition: "all .1s cubic-bezier(.4, 0, .2, 1)",
  userSelect: "none",
  webkitUserSelect: "none",
  touchAction: "manipulation",
  boxShadow:
    "-6px 8px 10px rgba(81, 41, 10, 0.1), 0px 2px 2px rgba(81, 41, 10, 0.2)",
  "&:active": {
    backgroundColor: "#f3f4f6",
    boxShadow:
      "-1px 2px 5px rgba(81,41,10,0.15),0px 1px 1px rgba(81,41,10,0.15)",
    transform: "translateY(0.125rem)",
  },
  "&:focus": {
    boxShadow:
      "rgba(72, 35, 7, .46) 0 0 0 4px, -6px 8px 10px rgba(81,41,10,0.1), 0px 2px 2px rgba(81,41,10,0.2)",
  },
};

const page = {
  backgroundColor: "#e2ebfc",
  justifyContent: "center",
  // height: "100vh",
};

const pageEvaluation = {
  backgroundColor: "#e2ebfc",
  justifyContent: "center",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  // height: "100vh",
};

const containerEvaluation = {
  backgroundColor: "red",
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
};

const nameText = {
  marginLeft: 0,
  marginTop: 8,
  fontSize: 25,
  flex: 5,
};

const defaultColDef = {
  fontFamily: "Palatino",
  fontSize: 15,
  backgroundColor: "red",
};

const grouping = {
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
};

const groupingName = {
  display: "flex",
  marginTop: 10,
  marginBottom: 10,
  width: "100%",
  height: 40,
  justifyContent: "center",
};

const groupingInputsEvaluation = {
  display: "flex",
  marginTop: 0,
  marginBottom: 10,
  width: "100%",
  height: 40,
  justifyContent: "left",
};

const groupingInputsFields = {
  display: "flex",
  marginTop: 20,
  marginBottom: 20,
  width: "100%",
  height: 40,
  justifyContent: "left",
};

const groupingInputsCard = {
  display: "flex",
  width: "100%",
  height: "20vh",
  justifyContent: "left",
};

const headerText = {
  marginLeft: 20,
  marginTop: 7,
  flex: 1,
};

const headerValue = {
  marginLeft: 20,
  marginTop: 7,
  flex: 1,
};

const TextFieldLeft = {
  marginRight: 10,
  marginTop: 7,
  flex: 1,
};

const TextFieldRight = {
  marginTop: 7,
  marginRight: 10,
  flex: 1,
};

const TextFieldLeftAvatar = {
  marginRight: 10,
  marginTop: 7,
  flex: 1,
};

const TextFieldRightTitle = {
  marginRight: 10,
  marginTop: 7,
  flex: 2,
};

const saveButton = {
  margin: "10px",
  padding: "15px 30px",
  textAlign: "center",
  textTransform: "uppercase",
  transition: "0.5s",
  backgroundSize: "200% auto",
  color: "white",
  borderRadius: "10px",
  display: "block",
  border: "0px",
  fontWeight: 700,
  boxShadow: "0px 0px 14px -7px #f09819",
  backgroundImage:
    "linear-gradient(45deg, #FF512F 0%, #F09819  51%, #FF512F  100%)",
  cursor: "pointer",
  userSelect: "none",
  webkitUserSelect: "none",
  touchAction: "manipulation",
  "&:hover": {
    backgroundPosition: "right center",
    color: "#fff",
    textDecoration: "none",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
};

const formName = {
  fontFamily: "cursive",
  fontSize: 40,
  flex: 1,
};

export const sharedStyles = {
  container: container,
  groupingInputs: groupingInputs,
  containerStyle: containerStyle,
  gridStyle: gridStyle,
  header: header,
  buttonDiv: buttonDiv,
  buttonsClass: buttonsClass,
  acceptButton: acceptButton,
  rejectButton: rejectButton,
  page: page,
  containerEvaluation: containerEvaluation,
  nameText: nameText,
  defaultColDef: defaultColDef,
  grouping: grouping,
  groupingName: groupingName,
  groupingInputsEvaluation: groupingInputsEvaluation,
  groupingInputsFields: groupingInputsFields,
  groupingInputsCard: groupingInputsCard,
  headerText: headerText,
  headerValue: headerValue,
  TextFieldLeft: TextFieldLeft,
  TextFieldRight: TextFieldRight,
  TextFieldLeftAvatar: TextFieldLeftAvatar,
  TextFieldRightTitle: TextFieldRightTitle,
  saveButton: saveButton,
  formName: formName,
  pageEvaluation: pageEvaluation,
};

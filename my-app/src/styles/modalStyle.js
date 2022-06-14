const darkBG = {
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  width: "100vw",
  height: "100vh",
  zIndex: 0,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  position: "absolute",
};

const centered = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const modal = {
  width: "250px",
  height: "170px",
  background: "white",
  color: "white",
  zIndex: "10",
  borderRadius: "16px",
  boxShadow: "0 5px 20px 0 rgba(0, 0, 0, 0.04)",
};

const modalHeader = {
  height: "50px",
  background: "white",
  overflow: "hidden",
  borderTopLeftRadius: "16px",
  borderTopRightRadius: "16px",
};

const heading = {
  margin: 0,
  padding: "10px",
  color: "#2c3e50",
  fontWeight: 500,
  fontSize: "18px",
  textAlign: "center",
};

const modalContent = {
  padding: "10px",
  fontSize: "14px",
  color: "#2c3e50",
  textAlign: "center",
};

const modalActions = {
  position: "absolute",
  bottom: "2px",
  marginBottom: "10px",
  width: "100%",
};

const actionsContainer = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
};

const closeBtn = {
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
};

export const ModalStyle = {
  darkBG: darkBG,
  centered: centered,
  modal: modal,
  modalHeader: modalHeader,
  heading: heading,
  modalContent: modalContent,
  modalActions: modalActions,
  actionsContainer: actionsContainer,
  closeBtn: closeBtn,
};

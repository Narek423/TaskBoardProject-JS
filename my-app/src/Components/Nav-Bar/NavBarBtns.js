import { Button, ButtonGroup } from "@mui/material";
import React from "react";
import { createUseStyles } from "react-jss";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0099ff",
      darker: "#053e85",
    },
  },
});

const useStyle = createUseStyles(() => {
  return {
    navbarbtns: {
      flex: 4,
      fontSize: 17,
      margin: "auto",
      marginRight: 5,
      justifyContent: "center",
      textAlign: "center",
    },
    aboutus: {
      color: "#4d79ff",
    },
    contactus: {
      color: "#4d79ff",
    },
  };
});

function NavBarBtns(props) {
  const classes = useStyle();
  const { scrollTo, about, product, contactUs } = props.refs;

  return (
    <div className={classes.navbarbtns}>
      <ThemeProvider theme={theme}>
        <ButtonGroup
          color="primary"
          variant="text"
          aria-label="text button group"
        >
          <Button onClick={() => scrollTo(about)}>About</Button>
          <Button onClick={() => scrollTo(product)}>Product</Button>
          <Button onClick={() => scrollTo(contactUs)}>Contacts</Button>
        </ButtonGroup>
      </ThemeProvider>
    </div>
  );
}

export default NavBarBtns;

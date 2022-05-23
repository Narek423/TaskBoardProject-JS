import { Button, ButtonGroup } from "@mui/material";
import React from "react";
import { createUseStyles } from "react-jss";
import { createTheme,ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#0000e6',
        darker: '#053e85',
      },
      
    },
  });
  

const useStyle = createUseStyles(() => {
  return {
    navbarbtns: {
      flex: 1,
      position: 'relative',
      fontSize: 17
    },
    aboutus: {
        color: "#4d79ff",
        position: 'absolute',
        bottom: 1,
        left: 60
    },
    contactus: {
        color: "#4d79ff",
        position: 'absolute',
        bottom: 7,
        left: 150 

    }
  };
});

function NavBarBtns(params) {
  const classes = useStyle();

  return (
    <div className={classes.navbarbtns}>
      {/* <span className={classes.aboutus}>About us</span>
      <span className={classes.contactus}>Contact us</span> */}
      <ThemeProvider theme={theme}>
      <ButtonGroup color="primary" style={{
          position: "absolute",
          top: 21,
          left: 80,
      }} variant="text" aria-label="text button group">
        <Button >Company</Button>
        <Button >About Us</Button>
        <Button >Contacts</Button>
      </ButtonGroup>
      </ThemeProvider>
    </div>
  );
}

export default NavBarBtns;

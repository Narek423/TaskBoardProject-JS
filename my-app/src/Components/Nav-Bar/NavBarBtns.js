import { Button, ButtonGroup } from "@mui/material";
import React from "react";
import { createUseStyles } from "react-jss";
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { PropaneSharp } from "@mui/icons-material";

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
      flex: 3,
      fontSize: 17,
      margin: 'auto'
    },
    aboutus: {
        color: "#4d79ff",
    },
    contactus: {
        color: "#4d79ff",

    }
  };
});

function NavBarBtns(props) {
  const classes = useStyle();
  console.log(props)

  return (
    <div className={classes.navbarbtns}>
      {/* <span className={classes.aboutus}>About us</span>
      <span className={classes.contactus}>Contact us</span> */}
      <ThemeProvider theme={theme}>
      <ButtonGroup color="primary" 
      // style={{
      //     position: "absolute",
      //     top: 21,
      //     left: 80,
      // }}
       variant="text" aria-label="text button group">
        <Button onClick={() => props.refs.scrollTo(props.refs.about)}>Company</Button>
        <Button >About Us</Button>
        <Button onClick={() => props.refs.scrollTo(props.refs.contactUs)}>Contacts</Button>
      </ButtonGroup>
      </ThemeProvider>
    </div>
  );
}

export default NavBarBtns;

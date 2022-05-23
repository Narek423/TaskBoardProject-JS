import React from "react";
import Button from '@mui/material/Button';
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

const useStyle = createUseStyles(()=> {
    return {
        auth: {
           flex: 1,
           position: 'relative',
        },
    }
})


function Auth() {
    const classes = useStyle();

  return (
    <div className={classes.auth}>
        <div className={classes.authBtns}>
            <ThemeProvider theme={theme}>
      <Button
        style={{
          position: 'absolute',
          right: 50,
          top: 15
      }} variant="outlined">Sing In</Button>
      <Button 
       style={{
          position: 'absolute',
          right: 140,
          top: 15
      }} variant="outlined">Sing Up</Button>
      </ThemeProvider>
      </div>
    </div>
  );
}

export default Auth

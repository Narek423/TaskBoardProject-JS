
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { createUseStyles } from "react-jss";
import { useUserAuth } from "../../../context/UserAuthContext";
import { Button, CircularProgress, Input } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import  defaultImg  from "../../../Images/images.png"
export let avatarUrl = "";


const theme = createTheme({
  status: {
    danger: "red",
  },
  palette: {
    primary: {
      main: "#ee0000",
    },
  },
});
const useStyle = createUseStyles(() => {
  return {
    imgList: {
      height: "100%",
      width: "80%",
      flex: 5,
      display: "flex",
      marginLeft: "5%",
      overflowX: "scroll",
      "&::-webkit-scrollbar": {
        width: 10,
      },
      "&::-webkit-scrollbar-track": {
        background: "white",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#019CAD",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#019CAD",
      },
    },
    imgBlock: {
      height: "100%",
      textAlign: "center",
      flexDirection: "column",
      "&:hover": {
        backgroundColor: "white",
        // boxShadow: "blue 0 -6px 8px inset",
        cursor: "pointer",
        opacity: 0.8,
      },
      
    },
    img: {
      width: "100%",
      height: "100%",
      // cursor: "zoom-in",
      justifyContent: "center",
    },
  };
});

function FileUploader(props) {
  const [file,setFile] = useState('');
  const [fileSize,setFileSize] = useState(0);
  const { files,setFiles } = props;
  const classes = useStyle();
  const { user } = useUserAuth();


  const handleChange = (e) => {
    e.preventDefault();
    if(files.length > 4) return;
    setFile(e.target.files[0]);
    setFiles([...files.concat(e.target.files[0])]);
  };
  const delFile = (index) => {
    setFiles(files.filter((e,ind) => index !== ind ))
  }
  return (
    <div className={classes.imgList}>
      {files.map((e,ind) => {
        return (
          <div className={classes.imgBlock} key={uuidv4()}>
            <div style={{
              backgroundImage: `url(${defaultImg})`,
              backgroundSize: 'cover',
             height: "100%",
             width: 140,
             position: 'relative'
            }}
           >
             
            <div  style={{
                  position: "absolute",
                  right: 0,
                  width: '20%',
                  height: "20%",
                  borderBottomLeftRadius: "100%",
                  backgroundColor: 'red',
                  color: "white"
                }} 
                onClick={() => delFile(ind)}
                >
                  x
            </div>
            {e.name}
            </div> 
          </div>
        );
      })}
      <label
        htmlFor="contained-button-file"
        style={{
          display: "contents",
          backgroundColor: "green",
        }}
      >
        <Input
          style={{
            display: "none",
          }}
          accept="image/*"
          id="contained-button-file"
          onChange={handleChange}
          multiple
          type="file"
        />
        <Button
          variant="contained"
          component="span"
          style={{
            fontSize: 40,
          }}
        >
          +
        </Button>
      </label>
    </div>
  );
}

export default FileUploader;

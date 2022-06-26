import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { createUseStyles } from "react-jss";
import { useUserAuth } from "../../../context/UserAuthContext";
import { Button, CircularProgress, Input } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
    div: {
      height: "100%",
      flex: 5,
      display: "flex",
      marginLeft: "5%",
    },
    imgBlock: {
      border: "2px solid white",
      borderRadius: 15,
      display: "flex",
      maxWidth: "fit-content",
      backgroundColor: "rgb(255 194 15 / 80%)",
      color: "purple",
      "&:hover": {
        backgroundColor: "orange",
        cursor: "pointer",
      },
    },
    imgList: {
      display: "flex",
      flexDirection: "column",
      height: 200,
      width: "100%",
    },
    textspan: {
      flex: 5,
      marginLeft: 6,
      paddingRight: 15,
    },
    del: {
      color: "red",
      paddingRight: 15,
      flex: 1,
      cursor: 'pointer'
    },
  };
});

function FileUploader(props) {
  const [file, setFile] = useState("");
  const { files, setFiles } = props;
  const classes = useStyle();
  const { user } = useUserAuth();

 

  const handleChange = (e) => {
    e.preventDefault();
    if (files.length > 4) return;
    setFile(e.target.files[0]);
    setFiles([...files.concat(e.target.files[0])]);
  };
  const delFile = (index) => {
    setFiles(files.filter((e, ind) => index !== ind));
  };
  return (
    <div className={classes.div}>
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
            fontSize: 10,
            height: 30,
          }}
        >
          Upload
        </Button>
      </label>
      <div className={classes.imgList}>
        {files.map((e, ind) => {
          return (
            <div className={classes.imgBlock} key={ind}>
              <span className={classes.textspan}>{e?.name.replaceAll(" ","_")}</span>
              <span className={classes.del} onClick={() => delFile(ind)}>
                X
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FileUploader;

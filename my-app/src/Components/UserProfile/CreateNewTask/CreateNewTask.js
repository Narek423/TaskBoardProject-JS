import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import {  useUserAuth } from "../../../context/UserAuthContext";
import FileUploader from "./FileUploader";
import HelperModal from "./HelperModal";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { storage, writeUserTask } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { async } from "@firebase/util";




const useStyle = createUseStyles(() => {
  return {
    main: {
      height: "99vh",
      width: "100%",
      margin: {
        top: 0,
        bottom: 0,
      },
      borderTop: "solid",
      borderTopColor: "#019CAD",
      borderBottom: "solid",
      borderBottomColor: "#019CAD",
      display: "flex",
      flexDirection: "column",
      position: "relative",
    },
    tittle: {
      flex: 1,
      fontSize: 50,
      margin: {
        top: 0,
      },
      textAlign: "center",
      fontFamily: "cursive",
      backgroundColor: "rgb(0,0,0,0.15)",
    },

    conteiner: {
      overflowY: "scroll",
      flex: 10,
      width: "100%",
      backgroundColor: "#e2ebfc",
      position: "relative",
      "&::-webkit-scrollbar": {
        width: 14,
      },
      "&::-webkit-scrollbar-track": {
        background: "grey",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#019CAD",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    },
    inputs: {
      flex: 4.5,
      display: "flex",
      flexDirection: "column",
    },
    Nodes: {
      margin: {
        left: "5%",
      },
      display: "flex",
    },
    inputTittle: {
      margin: {
        bottom: "2%",
        left: "5%",
      },
      display: "flex",
    },
    descr: {
      margin: {
        top: "2%",
        left: "5%",
      },
      display: "flex",
    },
  };
});

function CreateNewTask() {
  const classes = useStyle();
  const [titleValue, setTittleValue] = useState("");
  const [nodesValue, setNodesValue] = useState("");
  const [descrpValue, setDescrpValue] = useState("");
  const { user } = useUserAuth();
  // const [fileData, setFileData] = useState([]);
  const [files,setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  // const fileData = [];

  async function writeData(){
    const createDate = new Date().toLocaleString();
    const filesUID = uuidv4();
    const urls = await uploadFiles(files,filesUID);
    console.log(urls,"files")
    writeUserTask(
      user.uid,
      urls,
      
      titleValue,
      nodesValue,
      descrpValue,
      createDate,
      filesUID
    );
    setNodesValue("");
    setDescrpValue("");
    setDescrpValue("");
    setTittleValue("");
    setProgress(0);
    setFiles([]);
  };
  async function  uploadFiles(files,filesUID){
    if (!files) return;
      const load = (files) => {
        const fileData = [];
       files.forEach(file => {
      const storageRef =  ref(storage, `/${user.uid}/${filesUID}/${file.name}`);
      const uploadProcent = uploadBytesResumable(storageRef, file);
      uploadProcent.on(
        "state_changed",
        (snapshot) => {
          const proc = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (err) => console.log(err),
        () => 
            getDownloadURL(uploadProcent.snapshot.ref).then((url) => {
            // setFileData(fileData.push({url,name: file.name}));
            fileData.push({url, file: file.name});
            console.log(fileData,"fileConsole");
            }
          )
      );
    });
    return new Promise(resolve => { resolve(fileData)})
  }
  const urls = await load(files);
  console.log(urls,"urls")
  return urls
  };

  return (
    <div className={classes.main}>
      <p className={classes.tittle}>Create New Task</p>
      <div className={classes.conteiner}>
        <div className={classes.inputTittle}>
          <TextField
            style={{ marginRight: "1%", flex: 5 }}
            id="outlined-basic"
            value={titleValue}
            onChange={(event) => setTittleValue(event.target.value)}
            variant="outlined"
          />
          <HelperModal
            text={"Please type your new task tittle."}
            inputName={"Tittle"}
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              marginLeft: "0.5%",
              flex: 1,
            }}
          />
        </div>
        <div className={classes.Nodes}>
          <TextField
            style={{ marginRight: "1%", flex: 5 }}
            id="outlined-basic"
            value={nodesValue}
            onChange={(event) => setNodesValue(event.target.value)}
            variant="outlined"
          />
          <HelperModal
            text={
              "Please type your notes for your new task.  exapmele...Js Task"
            }
            inputName={"Notes"}
            style={{
              marginTop: "auto",
              marginBottom: "auto",
              marginLeft: "0.5%",
              flex: 1,
            }}
          />
        </div>

        <div className={classes.descr}>
          <TextField
            value={descrpValue}
            style={{ marginRight: "1%", flex: 5 }}
            onChange={(event) => setDescrpValue(event.target.value)}
            id="outlined-multiline-static"
            multiline
            rows={6}
          />
          <HelperModal
            inputName={"Description"}
            text={
              "Please describe your new task.Its must include info about your task and have more then 200 character"
            }
            style={{ marginTop: "1.8%", marginLeft: "0.5%", flex: 1 }}
          />
        </div>
        <div
          style={{
            display: "flex",
            marginBottom: "1%",
            marginTop: "2%",
            height: "20%",
          }}
        >
          <FileUploader  files={files} setFiles={setFiles} />
          <HelperModal
            inputName={"Files"}
            text={"If you have files you can upload that"}
            style={{ marginTop: "1.8%", marginLeft: "0.5%", flex: 1 }}
          />
        </div>

        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 20,
            right: 60,
            height: "6%",
          }}
        >
          <Button variant="contained" size="medium" onClick={writeData}>
            Create
          </Button>
          {/* <Button
            style={{
              marginLeft: "2%",
              marginRight: "2%",
            }}
            variant="contained"
            size="medium"
          >
            overview
          </Button> */}
          <Button variant="contained" size="medium">
            cencel
          </Button>
        </div>
      </div>
    </div>
  );
}
export default CreateNewTask;

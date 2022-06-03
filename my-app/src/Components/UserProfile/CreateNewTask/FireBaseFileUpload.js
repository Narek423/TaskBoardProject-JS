import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { storage, writeUserTask } from "../../firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";
import { createUseStyles } from "react-jss";
import { UserAuthContext, useUserAuth } from "../../../context/UserAuthContext";
import ImgModal from "./ImgModal";
import { Button, CircularProgress, Input } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import  defaultImg  from "../../img/img.jpg"
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
      flex: 5,
      display: "flex",
      marginLeft: "5%",
      overflowX: "scroll",
      "&::-webkit-scrollbar": {
        height: 10,
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
      width: 140,
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

function FireBaseFileUpload(props) {
  const [file,setFile] = useState('');
  const [fileSize,setFileSize] = useState(0);
  const [progress, setProgress] = useState(0);
  const [imgModalopen, setImgModalOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const { filaeData, setFileData } = props;
  const [modalImg, setModalImg] = useState(filaeData[imgIndex]);
  const classes = useStyle();
  const { user } = useUserAuth(UserAuthContext);


  const handleChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    uploadFiles(e.target.files[0]);
    setProgress(0);
  };

  // useEffect(() => {
  //   if(file.type === "image/jpeg"){
  //     setFileType("image")
  //   }
  // },[file])
  const uploadFiles = (file) => {
    //upload-a anum firebas-i storage
    if (!file) return;
    const storageRef = ref(storage, `/${user.email}/${file.name}`);
    const uploadProcent = uploadBytesResumable(storageRef, file);

    uploadProcent.on(
      "state_changed",
      (snapshot) => {
        const proc = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(proc);
      },
      (err) => console.log(err),
      () =>
        getDownloadURL(uploadProcent.snapshot.ref).then((url) =>
          setFileData([...filaeData.concat({url,name: file.name,type: file.type})])
        )
    );
  };

  const delFile = (url,event) => {
    //Firebas-i storage-ic u localic  jnjuma fil@
    event.stopPropagation();
    const imageRef = ref(storage, url);
    deleteObject(imageRef)
      .then(() => {
        setFileData([
          ...filaeData.filter((e) => {
            if (e.url === e) {
              return false;
            } else {
              return e;
            }
          }),
        ]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.imgList}>
      {filaeData.map((e,index,) => {
              console.log(file)

        return (
          <div className={classes.imgBlock} key={uuidv4()}>
            {e.type === "image/jpeg" ? 
            <div style={{
              backgroundImage: `url(${e.url})`,
              backgroundSize: 'cover',
             height: "100%",
             width: 140,
             position: 'relative'
            }}
            onClick={() => {
              setImgModalOpen(!imgModalopen);
              setModalImg(filaeData[index].url);
            }}>    
            <div  style={{
                  position: "absolute",
                  right: 0,
                  width: '20%',
                  height: "20%",
                  borderBottomLeftRadius: "100%",
                  backgroundColor: 'red',
                  color: "white"
                }} 
                onClick={(event) => delFile(e.url,event)}
                >
                  x
            </div>

            </div> :  <div style={{
              backgroundImage: `url(${defaultImg})`,
              backgroundSize: 'cover',
             height: "100%",
             width: 140,
             position: 'relative'
            }}
            onClick={() => {
              setImgModalOpen(!imgModalopen);
              setModalImg(filaeData[index].url);
            }}>
             
            <div  style={{
                  position: "absolute",
                  right: 0,
                  width: '20%',
                  height: "20%",
                  borderBottomLeftRadius: "100%",
                  backgroundColor: 'red',
                  color: "white"
                }} 
                onClick={(event) => delFile(e.url,event)}
                >
                  x
            </div>
            {e.name}
            </div> }
          </div>
        );
      })}
      {/* <div
        style={{
          height: "100%",
          width: "10%",
          backgroundColor: "red",
        }}
      >
        {progress !== 100 && progress !== 0 ? (
          <div
            style={{
              height: 140,
            }}
          >
            {" "}
            <CircularProgress variant="determinate" value={progress} />
          </div>
        ) : (
          <div
            style={{
              position: "absolute",
              width: "30%",
              backgroundColor: "red",
            }}
          >
            <label
              style={{
                cursor: "pointer",
                backgroundColor: "blue",
                justifyContent: "center",
              }}
              className="custom-file-upload"
            >
              <AddIcon></AddIcon>
              <input
                type="file"
                onChange={handleChange}
                style={{
                  display: "none",
                }}
              />
            </label>
          </div>
        )}
      </div> */}
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
      <ImgModal
        imgModalopen={imgModalopen}
        setImgModalOpen={setImgModalOpen}
        filaeData={filaeData}
        modalImg={modalImg}
        setModalImg={setModalImg}
      />
    </div>
  );
}

export default FireBaseFileUpload;

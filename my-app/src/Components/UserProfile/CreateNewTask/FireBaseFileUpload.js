import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useState } from "react";
import { userData } from "../../../context/UserData";
import { storage } from "../../firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";
import pictureModal from "./pictureModal";
import { ClassNames } from "@emotion/react";
import { createUseStyles } from "react-jss";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRight from "@mui/icons-material/ArrowCircleRight";

export let avatarUrl = "";
const useStyle = createUseStyles(() => {
  return {
    imgModal: {
      width: "100vw",
      height: "100vh",
      position: "fixed",
      backgroundColor: "rgb(0,0,0,0.6)",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
    },
    imgList: {
      display: "flex",
      height: "100%",
    },
    imgBlock: {
      width: "10%",
      height: "100%",
      textAlign: "center",
      display: "flex",
      flexDirection: 'column'
    },
    img: {
      width: "100%",
      height: "100%",
      cursor: "zoom-in"
    },
  };
});

function FireBaseFileUpload() {
  const [progress, setProgress] = useState(0);
  const { avatarLink } = useContext(userData);
  const [filaeData, setFileData] = useState([]);
  const [imgModalopen, setImgModalOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [modalImg, setModalImg] = useState(filaeData[imgIndex]);
  const classes = useStyle();

  const handleChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    uploadFiles(file);
    setProgress(0);
  };

  const uploadFiles = (file) => {
    //upload-a anum firebas-i storage
    if (!file) return;
    const storageRef = ref(storage, `/avatars/${file.name}`);
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
          setFileData([...filaeData.concat(url)])
        )
    );
  };

  const delFile = (url) => {
    //Firebas-i storage-ic chi jnjum fil@
    setFileData([
      ...filaeData.filter((e) => {
        if (url === e) {
          return;
        } else {
          return e;
        }
      }),
    ]);
  };

  return (
    <div className={classes.imgList}>
      {filaeData.map((url, index) => {
        return (
          <div
            className={classes.imgBlock}
            onClick={() => {
              setImgModalOpen(!imgModalopen);
              setModalImg(filaeData[index]);
            }}
            key={uuidv4()}
          >
            <img className={classes.img} alt="pic" src={url}></img>
            <DeleteIcon onClick={() => delFile(url)} />
          </div>
        );
      })}
      {progress !== 100 && progress !== 0 ? `${progress}%` : null}
      {/* <pictureModal /> */}
      <label
        style={{
          borderBlock: "1px solid black",
          height: "20%",
          width: "5%",
        }}
        className="custom-file-upload"
      >
        <input
          type="file"
          onChange={handleChange}
          style={{
            display: "none",
          }}
        />
        Upload
      </label>
      {imgModalopen ? (
        <div
          className={classes.imgModal}
          onClick={(event) => {
            setImgModalOpen(!imgModalopen);
          }}
        >
          <div
            // onClick={(event) => {
            //   setImgModalOpen(!imgModalopen);
            // }}
            style={{
              height: "65%",
              width: "55%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "10%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <ArrowCircleLeftIcon
              onClick={(event) => {
                event.stopPropagation();
                const index = filaeData.indexOf(modalImg);
                if (index - 1 >= 0) {
                    setModalImg(filaeData[index - 1]);
                } else {
                    return
                }
              }}
              fontSize="large"
              style={{
                marginTop: "30%",
              }}
            />
            <img
              src={modalImg}
              style={{
                height: "100%",
                width: "100%",
                cursor: 'zoom-out'
              }}
            ></img>
            <ArrowCircleRight
             onClick={(event) => {
                event.stopPropagation();
                const index = filaeData.indexOf(modalImg);
                if (index + 1 < filaeData.length) {
                    setModalImg(filaeData[index + 1]);
                } else {
                    return
                }
              }}
              fontSize="large"
              style={{
                marginTop: "30%",
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default FireBaseFileUpload;

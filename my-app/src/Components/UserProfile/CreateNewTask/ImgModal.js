import React from "react";
import { createUseStyles } from "react-jss";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRight from "@mui/icons-material/ArrowCircleRight";

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
    modalBody: {
      height: "65%",
      width: "55%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "10%",
      display: "flex",
      justifyContent: "space-between",
    },
    img: {
      height: "100%",
      width: "100%",
      cursor: "zoom-out",
    },
    arrowLeftClick: {
      position: "fixed",
      marginTop: "15%",
      marginLeft: "60%",
      "&:hover": {
        transform: "scale(1.425)",
        cursor: "pointer",
      },
      "&:active": {
        transform: "scale(1.125)",
      },
    },
    arrowRightClick: {
      position: "fixed",
      marginTop: "15%",
      marginRight: "60%",
      "&:hover": {
        transform: "scale(1.425)",
        cursor: "pointer",
      },
      "&:active": {
        transform: "scale(1.125)",
      },
    },
  };
});
function ImgModal(props) {
  const { imgModalopen, fileData, modalImg, setModalImg, setImgModalOpen } =
    props;
  const classes = useStyle();

  const arrowRightClick = (event) => {
    event.stopPropagation();
    const index = fileData.indexOf(modalImg);
    if (index + 1 < fileData.length) {
      setModalImg(fileData[index + 1]);
    } else {
      return;
    }
  };
  const arrowLeftClick = (event) => {
    event.stopPropagation();
    const index = fileData.indexOf(modalImg);
    if (index - 1 >= 0) {
      setModalImg(fileData[index - 1]);
    } else {
      return;
    }
  };
  return (
    <>
      {imgModalopen ? (
        <div
          className={classes.imgModal}
          onClick={(event) => {
            setImgModalOpen(!imgModalopen);
          }}
        >
          {" "}
          <ArrowCircleLeftIcon
            onClick={(event) => arrowLeftClick(event)}
            fontSize="large"
            className={classes.arrowLeftClick}
          />
          <ArrowCircleRight
            onClick={(event) => arrowRightClick(event)}
            fontSize="large"
            className={classes.arrowRightClick}
          />
          <div className={classes.modalBody}>
            <img src={modalImg} alt="img" className={classes.img}></img>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ImgModal;

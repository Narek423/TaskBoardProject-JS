import React, { useRef } from "react";
import NavMainBar from "../Nav-Bar/HomePageNavBar";
import evaluationImg from "../../Images/evaluation.jpg";
import profileImg from "../../Images/profile.jpg";
import { createUseStyles } from "react-jss";
import { useUserAuth } from "../../context/UserAuthContext";
import { Navigate } from "react-router-dom";
import paths from "../../constants/Paths";
import { Card, CardContent, Typography } from "@mui/material";
import { SocialIcon } from "react-social-icons";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const useStyle = createUseStyles(() => {
  return {
    maindiv: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    icon: {
      fontFamily: "monospace",
      fontSize: 40,
      padding: 0,
      marginTop: 0,
      marginBottom: 0,
      color: "#054570",
      cursor: "pointer",
      marginLeft: "10%",
      textShadow: "2px 3px 0 #c5c5c5",
    },
    container: {
      flex: 10,
      marginTop: 0,
      overflowY: "scroll",

      "&::-webkit-scrollbar": {
        width: 14,
      },
      "&::-webkit-scrollbar-track": {
        background: "#e2ebfc",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#0099ff",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    },
  };
});
function HomePage(params) {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyle();
  const about = useRef();
  const product = useRef();
  const contactUs = useRef();

  const scrollTo = (ref) => {
    return ref?.current?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
  };
  const { user } = useUserAuth();
  const { PROFILE_PATH } = paths;

  return user ? (
    <Navigate to={PROFILE_PATH} />
  ) : (
    <div className={classes.maindiv}>
      <NavMainBar
        about={about}
        product={product}
        contactUs={contactUs}
        scrollTo={scrollTo}
      />
      <div className={classes.container}>
        <div
          ref={about}
          style={{
            height: 550,
            marginTop: "4%",
            alignItems: "center",
            float: "right",
            display: "flex",
            textAlign: "center",
          }}
        >
          {!smallScreen && (
            <div
              style={{
                marginLeft: 70,
                marginRight: 70,
                height: "75%",
                width: "100%",
                backgroundImage: `url("${evaluationImg}")`,
                backgroundSize: "100% 100%",
                alignItems: "center",
                flex: 5,
              }}
            ></div>
          )}
          <div
            style={{
              flex: 4,
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            <h1 className={classes.icon}>About us</h1>
            <hr
              style={{
                height: "2px",
                borderWidth: 0,
                color: "#0099ff",
              }}
            ></hr>
            <Card
              sx={{
                width: "100%",
                height: "320px",
                minWidth: "550px",
                boxShadow: "15px 15px 10px -15px #111",
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  TaskBoard has become such an integral part of our work! By
                  putting our work on TaskBoard, we made it easy to work across
                  customers without overloading ourselves with messages, email
                  threads or other boring communication methods. In our days,
                  tools like TaskBoard are considered a necessity for any
                  business. So, we will be happy to see the name of your company
                  in the countless list of our partners.
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>

        <div
          ref={product}
          style={{
            height: 550,
            marginTop: "4%",
            alignItems: "center",
            float: "right",
            display: "flex",
            textAlign: "center",
          }}
        >
          <div
            style={{
              flex: 4,
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            <h1 className={classes.icon}>Product</h1>
            <hr
              style={{
                height: "2px",
                borderWidth: 0,
                color: "#0099ff",
              }}
            ></hr>
            <Card
              sx={{
                width: "100%",
                height: "400px",
                minWidth: "550px",
                boxShadow: "15px 15px 10px -15px #111",
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Using Task Board you can have unlimited customers and get
                  unlimited tasks from them. You and your customers can see,
                  control and edit all tasks. You, as admin, can evaluate all
                  incoming tasks, and after your customer can accept or reject
                  it. You and your customers can attach files into tasks.
                  TaskBoard have it's oun messaging system. For task control you
                  have full and groupped by states tasks lists. You can export
                  your task lists from anyware. TaskBoard is very easy to use.
                  In TaskBoard everything done for your comfortable use.
                </Typography>
              </CardContent>
            </Card>
          </div>
          {!smallScreen && (
            <div
              style={{
                marginLeft: 70,
                marginRight: 70,
                height: "75%",
                width: "100%",
                backgroundImage: `url("${profileImg}")`,
                backgroundSize: "100% 100%",
                alignItems: "center",
                flex: 5,
              }}
            ></div>
          )}
        </div>

        <div
          ref={contactUs}
          style={{
            height: 550,
            width: "100%",
            marginTop: "4%",
            alignItems: "center",
            float: "right",
            display: "flex",
            textAlign: "center",
          }}
        >
          {!smallScreen && (
            <div
              style={{
                marginLeft: 70,
                marginRight: 70,
                height: "75%",
                width: "100%",
                backgroundImage: `url("${evaluationImg}")`,
                backgroundSize: "100% 100%",
                alignItems: "center",
                flex: 5,
              }}
            ></div>
          )}
          <div
            style={{
              flex: 4,
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            <h1 className={classes.icon}>Contacts</h1>
            <hr
              style={{
                height: "2px",
                borderWidth: 0,
                color: "#0099ff",
              }}
            ></hr>
            <Card
              sx={{
                width: "100%",
                height: "300px",
                minWidth: "550px",
                boxShadow: "15px 15px 10px -15px #111",
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  <div style={{ marginBottom: 20, fontWeight: "bold" }}>
                    Company: BoardTask GMBH
                  </div>
                  <div>
                    Address: Weiherstrasse 13, Hochheim am Main, 65239, Germany
                  </div>
                  <div>Phone number: + (061) 46 613 13</div>
                  <div style={{ marginTop: 60 }}>
                    <SocialIcon
                      style={{ marginRight: 10 }}
                      url="https://www.facebook.com/levon.kirakosyan.14/"
                    />
                    <SocialIcon
                      style={{ marginRight: 10 }}
                      url="https://www.linkedin.com/in/levon-kirakosyan-61083463/"
                    />
                    <SocialIcon
                      style={{ marginRight: 10 }}
                      url="https://web.telegram.org/z/"
                    />
                    <SocialIcon
                      style={{ marginRight: 10 }}
                      url="https://github.com/Narek423/TaskBoardProject-JS"
                    />
                  </div>
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 0, marginBottom: 0 }}>
          © 2022 TaskBoard GMBH. All Rights Reserved. (Gr)
        </div>
      </div>
    </div>
  );
}

export default HomePage;

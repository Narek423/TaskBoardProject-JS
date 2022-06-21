import React, { useRef } from "react";
import NavMainBar from "../Nav-Bar/HomePageNavBar";
import evaluationImg from "../../Images/evaluation.jpg";
import profileImg from "../../Images/profile.jpg";
import { createUseStyles } from "react-jss";
import { useUserAuth } from "../../context/UserAuthContext";
import { Navigate } from "react-router-dom";
import paths from "../../constants/Paths";
import { Button, Card, CardContent, Typography } from "@mui/material";
import {
  Facebook,
  Instagram,
  Linkedin,
  Telegram,
} from "@trejgun/material-ui-icons-social-networks";

const useStyle = createUseStyles(() => {
  return {
    maindiv: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
    },
    container: {
      flex: 10,
      marginTop: 0,
      overflowY: "scroll",
      //backgroundColor: "#b3ffe6",

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
            //  backgroundColor: "#99ffdd",
            marginTop: "4%",
            alignItems: "center",
            float: "right",
            display: "flex",
            textAlign: "center",
          }}
        >
          <div
            style={{
              marginLeft: 20,
              marginRight: 20,
              height: "100%",
              height: "90%",
              backgroundImage: `url("${evaluationImg}")`,
              backgroundSize: "100% 100%",
              alignItems: "center",
              flex: 5,
            }}
          ></div>
          <div
            style={{
              flex: 4,
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            <h1>About us</h1>
            <hr
              style={{
                height: "2px",
                borderWidth: 0,
                color: "#0099ff",
                //  backgroundColor: "#0099ff",
              }}
            ></hr>
            <Card
              sx={{
                width: "100%",
                height: "300px",
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
            // backgroundColor: "#99ffdd",
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
            <h1>Product</h1>
            <hr
              style={{
                height: "2px",
                borderWidth: 0,
                color: "#0099ff",
                // backgroundColor: "#0099ff",
              }}
            ></hr>
            <Card
              sx={{
                width: "100%",
                height: "400px",
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
          <div
            style={{
              marginLeft: 20,
              marginRight: 20,
              height: "100%",
              height: "90%",
              backgroundImage: `url("${profileImg}")`,
              backgroundSize: "100% 100%",
              alignItems: "center",
              flex: 5,
            }}
          ></div>
        </div>

        <div
          ref={contactUs}
          style={{
            height: 550,
            //  backgroundColor: "#99ffdd",
            marginTop: "4%",
            alignItems: "center",
            float: "right",
            display: "flex",
            textAlign: "center",
          }}
        >
          <div
            style={{
              marginLeft: 20,
              marginRight: 20,
              height: "100%",
              height: "90%",
              backgroundImage: `url("${evaluationImg}")`,
              backgroundSize: "100% 100%",
              alignItems: "center",
              flex: 5,
            }}
          ></div>
          <div
            style={{
              flex: 4,
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            <h1>About us</h1>
            <hr
              style={{
                height: "2px",
                borderWidth: 0,
                color: "#0099ff",
                //  backgroundColor: "#0099ff",
              }}
            ></hr>
            <Card
              sx={{
                width: "100%",
                height: "400px",
                boxShadow: "15px 15px 10px -15px #111",
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  <div>
                    Address: Weiherstrasse 13, Hochheim am Main, 65239, Germany
                  </div>
                  <div>Phone number: + (061) 46 613 13</div>

                  <div>
                    <Button variant="outlined" className={classes.button}>
                      <Facebook className={classes.icon} /> Facebook
                    </Button>
                  </div>
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

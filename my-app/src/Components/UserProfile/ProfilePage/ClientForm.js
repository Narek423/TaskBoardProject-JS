import { Paper } from "@mui/material";
import React from "react";
import { createUseStyles } from "react-jss";
import { useUserAuth } from "../../../context/UserAuthContext";
import BasicCard from "../../Card";

const useStyle = createUseStyles(() => {
  return {};
});

function ProfilePage() {
  const { user, imgUrl } = useUserAuth();

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <span
        style={{
          fontFamily: "cursive",
          fontSize: 50,
        }}
      >
        Profile
      </span>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            backgroundColor: "yellow",
            flex: 1,
          }}
        ></div>
        <div
          style={{
            flex: 1,
            backgroundColor: "red",
            display: "flex",
          }}
        >
          <img
            src={imgUrl}
            style={{
              width: "40%",
              height: "100%",
            }}
          ></img>
          <div>
            <span
              style={{
                textAlign: "center",
              }}
            >
              Change Avatar
            </span>
          </div>
        </div>
        
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            backgroundColor: "yellow",
            flex: 1,
          }}
        ></div>
        <div
          style={{
            flex: 1,
            backgroundColor: "red",
            display: "flex",
          }}
        >
          <img
            src={imgUrl}
            style={{
              width: "40%",
              height: "100%",
            }}
          ></img>
          <div>
            <span
              style={{
                textAlign: "center",
              }}
            >
              Change Avatar
            </span>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default ProfilePage;

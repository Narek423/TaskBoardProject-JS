import { Paper } from "@mui/material";
import React from "react";
import { createUseStyles } from "react-jss";
import { useUserAuth } from "../../../context/UserAuthContext";
import BasicCard from "../../Card";

const useStyle = createUseStyles(() => {
  return {};
});

function ProfilePage() {
  const { user,imgUrl} = useUserAuth();

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
          backgroundColor: "red",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{
            width: "50%",
            flex: 1
        }}>
         
        </div>
        <div style={{
            width: '40%',
            flex: 1
        }}>
          <img src={imgUrl}></img>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;

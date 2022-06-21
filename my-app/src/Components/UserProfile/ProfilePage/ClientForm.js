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
    <div>
    Profile
    </div>
  );
}

export default ProfilePage;

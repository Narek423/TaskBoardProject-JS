import React from "react";
import Rolls from "../../constants/Rolls";
import { useUserAuth } from "../../context/UserAuthContext";
import Form from "./Form";
import { Route } from "react-router-dom";
import UserWorkingTable from "../UserProfile/UserWorkingTable/UserWorkingTable";
import GetProfile from "../UserProfile/ProfilePage/Main";
import paths from "../../constants/Paths";

function AdminUserRequests({ toolsBarOpen }) {
  const { Admin } = Rolls;
  const { roll } = useUserAuth();
  const { PROFILE_PATH } = paths;
  const component =
    roll === Admin ? (
      <Form />
    ) : (
      <Route
        path={PROFILE_PATH}
        element={
          <UserWorkingTable open={toolsBarOpen} component={GetProfile()} />
        }
      />
    );
  return component;
}

export default AdminUserRequests;

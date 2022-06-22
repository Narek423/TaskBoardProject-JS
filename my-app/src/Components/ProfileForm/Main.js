import { get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useUserAuth } from "../../context/UserAuthContext";
import Form from "./Form";

function GetProfileForm() {
  const { user } = useUserAuth();
  const clientId = user.uid;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const dbRef = getDatabase();
    get(ref(dbRef, "users/" + clientId))
      .then((snapshot) => {
        setData(snapshot.val());
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(true);
      });
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  data.clientId = clientId;
  const component = <Form data={data} />;
  return component;
}

export default GetProfileForm;

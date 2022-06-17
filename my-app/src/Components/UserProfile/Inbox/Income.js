import React, { useEffect, useMemo, useState } from "react";
// import { getInbox } from "../../firebase";
import { useUserAuth } from "../../../context/UserAuthContext";
import { ClassNames } from "@emotion/react";
import { createUseStyles } from "react-jss";

const useStyle = createUseStyles(() => {
  return {
    mail: {
      fontFamily: "monospace",
      fontSize: 20,
      display: "flex",
      paddingBottom: "1%",
      "&:hover": {
        //    backgroundColor: "#019CAD",
        fontSize: 25,
        boxShadow: "#1264F3 0 -6px 8px inset",
        cursor: "pointer",
      },
    },
  };
});

function Income() {
  const [inboxData, setInboxData] = useState([]);
  const { user } = useUserAuth();
  let page = 1;
  const [pages,setPages] = useState(page);
  const [listCountCheck, setListCountCheck] = useState([0, 10]);
  const data = [];
  const [start, end] = listCountCheck;
  const classes = useStyle();

  // useEffect(() => {
  //   getInbox(user.uid, setInboxData);
  // }, []);
  for (let key in inboxData) {
    data.push([key, inboxData[key]]);
  }
  const content = [];
  for (let i = start; i < end; i++) {
    content.push(data[i]);
  }
  return (
    <div
      style={{
        marginLeft: "2%",
        marginTop: "2%",
      }}
    >
      {data.length > 0
        ? content.map((e) => {
            console.log(e);
            if (e) {
              return (
                <div className={classes.mail} key={e[0]}>
                  <span
                    style={{
                      flex: 4,
                    }}
                  >
                    {e[1].emailText}
                  </span>
                  <span
                    style={{
                      flex: 3,
                    }}
                  >
                    {e[1].emailTittle}
                  </span>
                  <span
                    style={{
                      flex: 1,
                    }}
                  >
                    {e[1].date.slice(0, 10)}
                  </span>
                </div>
              );
            } else {
              return;
            }
          })
        : "no messegas"}
      <div
        style={{
          position: "fixed",
          bottom: 10,
          right: "35%",
        }}
      >
        <span
          onClick={() => {
            if (start !== 0) {
              const newStart = start - 10;
              const newEnd = end - 10;
              setListCountCheck([newStart, newEnd]);
              page = pages - 1;
              setPages(page)
            } else {
              return;
            }
          }}
        >
          {pages !== 1 ? "<" : null}
        </span>
        <span>{pages}</span>
        <span
          onClick={() => {
            if (end > data.length) {
              return;
            }
            const newStart = start + 10;
            const newEnd = end + 10;
            setListCountCheck([newStart, newEnd]);
            page = pages + 1;
            setPages(page)
          }}
        >
          {">"}
        </span>
      </div>
    </div>
  );
}
// export function getInbox(user,func){
//     const dbRef = ref(getDatabase());
//   get(child(dbRef, `inbox/${user}`)).then((snapshot) => {
//     if (snapshot.exists()) {
//       return (snapshot.val());
//   } else {
//       console.log("No data available");
//     }
//   }).catch((error) => {
//     console.error(error);
//   });
//   }

export default Income;

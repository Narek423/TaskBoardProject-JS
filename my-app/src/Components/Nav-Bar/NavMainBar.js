import React from "react";
import HomeIcon from "./HomeIcon";
import { createUseStyles } from "react-jss";
import Auth from "./Auth";
import NavBarBtns from "./NavBarBtns";

const useStyle = createUseStyles(() => {
  return {
    nav_bar: {
      flex: 1,
      display: "flex",
      backgroundColor: '#0099ff'
    },
  };
});

function NavMainBar(props) {
  const classes = useStyle();

  return (
    <div className={classes.nav_bar}>
      <HomeIcon />
      <NavBarBtns refs={props}/>
      <Auth />
    </div>
  );
}

export default NavMainBar;

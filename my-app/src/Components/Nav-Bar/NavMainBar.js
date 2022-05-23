import React from "react";
import HomeIcon from "./HomeIcon";
import { createUseStyles } from "react-jss";
import Auth from "./Auth";
import NavBarBtns from "./NavBarBtns";

const useStyle = createUseStyles(() => {
  return {
    nav_bar: { 
      height: 60,
      display: "flex", 
    },
  };
});

function NavMainBar() {
  const classes = useStyle();

  return (
    <div className={classes.nav_bar}>
      <HomeIcon />
      <NavBarBtns />
      <Auth />
    </div>
  );
}

export default NavMainBar;

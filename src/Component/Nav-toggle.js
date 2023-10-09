import React from "react";
import { Link } from "react-router-dom";
import logo from "../icons/logo.png"
const Nav_toggle = () => {

  const logoclick = () => {

  }

  return (
    <div>
      <div className="nav-toggle-box">
        <div className="top-navbar d-none d-xl-block">  
        <Link to="/"><img src={logo} style={{height:"45px"}}></img></Link>
        </div>
      </div>
    </div>
  );
};

export default Nav_toggle;

import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import ShoppingCart from "./ShoppingCart";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul className="navbar-ul">
      <li className="home-button-navbar">
        <NavLink exact to="/">
          <img
            className="home-logo"
            src="https://cdn.discordapp.com/attachments/1115823811116400650/1161148048131489962/GrubberLogo1.png?ex=65373e63&is=6524c963&hm=5cf491a305a3ea5d026a05eb14338cefd62e08caa094d4fcafb73576a60e7045&"
            alt="grubber logo"
          ></img>
        </NavLink>
      </li>
      {isLoaded && (
        <div className="profile-button-navbar">
          <ProfileButton user={sessionUser} />
          <div>
            <ShoppingCart user={sessionUser} />
          </div>
        </div>
      )}
    </ul>
  );
}

export default Navigation;

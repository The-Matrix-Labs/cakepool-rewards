import React from "react";
import Logo from "../assests/images/Logo.png";
import "./style.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
export default function Navbar() {
  return (
    <div className="navbarWrapper">
      <div className="logoWrapper">
        <img src={Logo} alt="logo" />
        <div>Cakepool</div>
      </div>
      <ConnectButton />
    </div>
  );
}

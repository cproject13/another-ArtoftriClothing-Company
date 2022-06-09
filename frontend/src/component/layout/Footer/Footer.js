import React from "react";
import "./Footer.css";
import { GrInstagram } from "react-icons/all"
import { FiFacebook } from "react-icons/all"
import logo from "../../../images/logo.png"

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <img className="imaging" src={logo} alt="logo" />
      </div>

      <div className="midFooter">
        <h1>Aesthetic Design is Our First Priority</h1>
        <p>Copyrights 2021 &copy; Artoftri Clothing Company</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us!</h4>
        <div className="social-icons">
          <a href="https://www.instagram.com/artoftriclothing/"><GrInstagram size={20} /></a>
          <a href="https://www.facebook.com/Artoftri.clothing/">< FiFacebook size={20} /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

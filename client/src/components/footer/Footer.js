import React from "react";
import "./Footer.css";
import FooterTop from "./FooterTop";
import FooterMiddle from "./FooterMiddle";
import FooterBottom from "./FooterBottom";
import { useSelector } from "react-redux";

function Footer() {
  const userInfo = useSelector((state) => state.amazon.userInfo);
  return (
    <div className="footer">
      {!userInfo._id && (<FooterTop />)}
      <FooterMiddle />
      <FooterBottom />
    </div>
  );
}

export default Footer;

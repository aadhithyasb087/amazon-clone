import React, { useState, useRef, useEffect } from "react";
import "./HeaderBottom.css";
import MenuIcon from "@mui/icons-material/Menu";
import SideNavContent from "./SideNavContent";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";

function HeaderBottom({ userInfo }) {
  const [showSideNav, setShowSideNav] = useState(false);
  const ref = useRef();
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (ref.current && e.target.contains(ref.current)) {
        setShowSideNav(false);
      }
    });
  }, []);
  const noFeatureHandler = () => {
    alert("This feature has not yet been created.");
  }
  return (
    <div className="header__bottom">
      <ul>
        <li
          className="headerHover header__bottom__all"
          onClick={() => setShowSideNav(!showSideNav)}
        >
          <MenuIcon></MenuIcon>
          All
        </li>
        <li className="headerHover" onClick={noFeatureHandler}>
          Today's Deals
        </li>
        <li className="headerHover" onClick={noFeatureHandler}>
          Customer Service
        </li>
        <li className="headerHover" onClick={noFeatureHandler}>
          Gift Cards
        </li>
        <li className="headerHover" onClick={noFeatureHandler}>
          Registry
        </li>
        <li className="headerHover" onClick={noFeatureHandler}>
          Sell
        </li>
      </ul>
      {showSideNav && (
        <div className="sideNav">
          <div className="sideNavInner">
            <motion.div
              ref={ref}
              initial={{ x: -500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="sideNavContainer"
            >
              <div className="sideNavContainerTop">
                <AccountCircleIcon></AccountCircleIcon>
                {userInfo._id ? (
                  <h3>{userInfo.userName}</h3>
                ) : (
                  <h3>Hello, Log In</h3>
                )}
                <span className="headerBottomCloseIcon">
                  <CloseIcon onClick={() => setShowSideNav(false)}></CloseIcon>
                </span>
              </div>
              <div className="sideNavContainerMiddle">
                <SideNavContent
                  title="Digital Content & Devices"
                  one="Amazon Music"
                  two="Kindle E-readers & Books"
                  three="Amazon Appstore"
                />
                <SideNavContent
                  title="Shop By Department"
                  one="Electronics"
                  two="Computers"
                  three="Smart Home"
                />
                <SideNavContent
                  title="Programs & Features"
                  one="Gift Cards"
                  two="Amazon live"
                  three="International Shopping"
                />
                <SideNavContent
                  title="Help & Settings"
                  one="Your Account"
                  two="Customer Service"
                  three="Contact us"
                />
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeaderBottom;

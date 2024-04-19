import React from "react";
import "./FooterTop.css";
import { Link } from "react-router-dom";

function FooterTop() {
  return (
    <div className="footer__top">
      <div className="footer__top__inner">
        <div className="footer__top__content">
          <p className="footer__top__content__top">
            See Personalised recommendations
          </p>
          <Link to={"/login"}>
            <button>Sign In</button>
          </Link>
          <p className="footer__top__content__bottom">
            New Customer?{" "}
            <Link to={"/register"}>
              <span>Start here.</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FooterTop;

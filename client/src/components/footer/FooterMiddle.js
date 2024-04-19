import React from "react";
import { middleList } from "../../constants/index";
import "./FooterMiddle.css";
import FooterMiddleList from "./FooterMiddleList";
import { logo, indiaFlag } from "../../assets/index";

function FooterMiddle() {
  return (
    <div className="footer__middle">
      {/* ============ Top Start here ================== */}
      <div className="footer__middle__cont">
        <div className="footer__middle__top">
          <div className="footer__middle__top__cont">
            {middleList.map((item) => (
              <FooterMiddleList
                key={item._id}
                title={item.title}
                listItem={item.listItem}
              />
            ))}
          </div>
        </div>
      </div>
      {/* ============ Top End here ==================== */}
      {/* ============ Bottom Start here =============== */}
      <div className="footer__middle__bottom">
        <div>
          <img className="footer__amazon__logo" src={logo} alt="logo" />
        </div>
        <div className="footer__middle__bottom__cont">
          <p className="footer__middle__bottom__lang">English</p>
          <div className="footer__middle__bottom__country">
            <img src={indiaFlag} alt="flagImg" />
            <p>India</p>
          </div>
        </div>
      </div>
      {/* ============ Bottom End here ================= */}
    </div>
  );
}

export default FooterMiddle
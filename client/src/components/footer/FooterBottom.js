import React from "react";
import { footerBottomItem } from "../../constants";
import "./FooterBottom.css";

const FooterBottom = () =>
{
   const noFeatureHandler = () => {
     alert("This feature has not yet been created.");
   };
  return (
    <div className="footer__bottom">
      <div className="footer__bottom__cont">
        <div className="footer__bottom__items">
          {footerBottomItem.map((item) => (
            <div
              className="footer__bottom__item"
              key={item._id}
              onClick={noFeatureHandler}
            >
              <h3>{item.title}</h3>
              <p>{item.des}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;

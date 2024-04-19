import React from "react";
import "./FooterMiddleList.css";

const FooterMiddleList = ({ title, listItem }) => {
  const noFeatureHandler = () => {
    alert("This feature has not yet been created.");
  };
  return (
    <div className="footerMiddleList">
      <h3 className="">{title}</h3>
      <ul onClick={noFeatureHandler}>
        {listItem.map((item) =>
          item.listData.map((data, i) => (
            <li key={i} className="footerLink">
              {data}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FooterMiddleList;

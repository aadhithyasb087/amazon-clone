import React from 'react'
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CloseIcon from "@mui/icons-material/Close";


function SideNavContent({ title, one, two, three })
{
   const noFeatureHandler = () => {
     alert("This feature has not yet been created.");
   };
  return (
    <div className="sideNavContainerContent">
      <h3>{title}</h3>
      <ul className="sideNavContainerContentInner">
        <li onClick={noFeatureHandler}>
          {one}{" "}
          <span>
            <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
          </span>
        </li>
      </ul>
      <ul className="sideNavContainerContentInner">
        <li onClick={noFeatureHandler}>
          {two}{" "}
          <span>
            <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
          </span>
        </li>
      </ul>
      <ul className="sideNavContainerContentInner">
        <li onClick={noFeatureHandler}>
          {three}{" "}
          <span>
            <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
          </span>
        </li>
      </ul>
    </div>
  );
}

export default SideNavContent
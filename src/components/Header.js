import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Header() {
  return (
    <div className="header">
      <img
        src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
        alt="amazon-logo"
        className="header__logo"
      />
      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <div className="header__option">
          <span className="header__optionLineOne">Hello Guest</span>
          <span className="header__optionLineTwo">Sign In</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>
      </div>
      <div className="header__shoppingCart">
        <ShoppingCartIcon
          className="header__cartIcon"
          fontSize="large"
        />
        <span className="header__cartCount">0</span>
      </div>
    </div>
  );
}

export default Header;

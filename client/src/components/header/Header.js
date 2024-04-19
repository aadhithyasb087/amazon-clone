import React, { useState, useEffect } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../../assets/index";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { allItems } from "../../constants/index";
import HeaderBottom from "./HeaderBottom";
import { useSelector, useDispatch } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOutReducer } from "../../redux/amazonSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

// import { useStateValue } from "../components/state/StateProvider";
// import { auth } from "../firebase";

function Header() {
  // const [{ cart, user }, dispatch] = useStateValue();

  const [showAll, setShowAll] = useState(false);
  const totalProducts = useSelector((state) => state.amazon.totalProducts);
  const userInfo = useSelector((state) => state.amazon.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchProduct, setSearchProduct] = useState("");
  
  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(signOutReducer());
        console.log(userInfo);
        alert("Sign out successfully");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const searchHandler = () => {
    if (searchProduct) {
      navigate(`/searchproduct?product=${searchProduct}`);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchProduct) {
      navigate(`/searchproduct?product=${searchProduct}`);
    }
  };

  return (
    <div className="header">
      <div className="header__top">
        <Link to="/">
          <div className="header__hover header__logo">
            <img src={logo} alt="amazon-logo" />
          </div>
        </Link>
        <div className="header__hover header__location">
          <LocationOnIcon></LocationOnIcon>
          <div className="header__option__location">
            <span className="header__optionLineOne">Deliver to</span>
            <span className="header__optionLineTwo">Chennai</span>
          </div>
        </div>
        <div className="header__search">
          <span
            className="header__search__filter"
            onClick={() => {
              setShowAll(!showAll);
            }}
          >
            All <span></span> <ArrowDropDownIcon />
          </span>
          {showAll && (
            <div className="header__search__filter__dropdown">
              <ul>
                {allItems.map((item) => (
                  <li key={item._id}>{item.title}</li>
                ))}
              </ul>
            </div>
          )}
          <input
            type="text"
            className="header__searchInput"
            value={searchProduct}
            onChange={(e) => {
              setSearchProduct(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search Products eg.electonics,jewelery etc"
          />
          <span className="header__searchIcon">
            <SearchIcon onClick={searchHandler} />
          </span>
        </div>
        <div className="header__nav">
          <div
            className="header__hover header__option"
            onClick={() => {
              if (userInfo._id) {
                alert(
                  "You have already signed in. To log in with a different account, log out first."
                );
              } else {
                navigate("/login");
              }
            }}
          >
            <span className="header__optionLineOne">
              {userInfo._id ? `Hello, ${userInfo.userName}` : "Hello, Login"}
            </span>
            <span className="header__optionLineTwoLogin">
              <span>Accounts & Lists</span>{" "}
              <p className="header__optionLineTwoLoginArrow">
                <ArrowDropDownIcon />
              </p>
            </span>
          </div>
          <Link to="/orders">
            <div className="header__hover header__option">
              <span className="header__optionLineOne">Returns</span>
              <span className="header__optionLineTwo">& Orders</span>
            </div>
          </Link>
        </div>
        <Link to="/cart">
          <div className="header__hover header__shoppingCart">
            <ShoppingCartIcon className="header__cartIcon" fontSize="large" />
            <span className="header__cartCount">{totalProducts}</span>
          </div>
        </Link>
        {userInfo._id && (
          <div
            className="header__hover header__logout"
            onClick={signOutHandler}
          >
            <LogoutIcon></LogoutIcon>
            <p>Log Out</p>
          </div>
        )}
      </div>
      <HeaderBottom userInfo={userInfo} />
    </div>
  );
}

export default Header;

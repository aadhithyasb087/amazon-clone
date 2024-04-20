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
import axios from "axios";

function Header() {
  const [showAll, setShowAll] = useState(false);
  const totalProducts = useSelector((state) => state.amazon.totalProducts);
  const userInfo = useSelector((state) => state.amazon.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchProduct, setSearchProduct] = useState("");

  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [currentCity, setCurrentCity] = useState();
  const API_ENDPOINT =
    "https://nominatim.openstreetmap.org/reverse?format=json&";

  useEffect(() => {
    const geolocationAPI = navigator.geolocation;
    const getUserCoordinates = () => {
      if (!geolocationAPI) {
        console.log("Geolocation API is not available in your browser!");
      } else {
        geolocationAPI.getCurrentPosition(
          (position) => {
            const { coords } = position;
            setLat(coords.latitude);
            setLong(coords.longitude);
          },
          (error) => {
            console.log("Something went wrong getting your position!");
          }
        );
      }
    };
    getUserCoordinates();
    const finalApi = `${API_ENDPOINT}lat=${lat}&lon=${long}`;
    axios
      .get(finalApi)
      .then((response) => {
        setCurrentCity(
          `${response.data.address.city}, ${response.data.address.state}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [lat, long]);

  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        dispatch(signOutReducer());
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
            <span className="header__optionLineOne">Delivering to</span>
            <span className="header__optionLineTwo">{currentCity}</span>
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

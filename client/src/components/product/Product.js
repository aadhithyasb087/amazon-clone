import "./Product.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/amazonSlice";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Product({ id, title, image, price, rating, description, category }) {
  const [showSideNavCart, setShowSideNavCart] = useState(false);
  const cart = useSelector((state) => state.amazon.cart);
  var quantity = 0;
  const ref = useRef();
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        setShowSideNavCart(false);
      }
    });
  }, []);
  const dispatch = useDispatch();

  const addToCartHandler = () => {
    if (cart.length) {
      const item = cart.find((item) => item.id === id);
      quantity = item.quantity?item.quantiy:0;
    }
    if (quantity <= 10) {
      dispatch(
        addToCart({
          id: id,
          title: title,
          image: image,
          price: price.toFixed(2),
          rating: rating,
          description: description,
          category: category,
          quantity: 1,
          totalPrice: 0,
        })
      );
    setShowSideNavCart(true);

    } else {
      alert("Max Order:10. You have reached maximum order for this product");
    }
  };

  return (
    <div className="product">
      <span className="product__category">{category}</span>
      <div className="product__image">
        <img src={image} alt="img" />
      </div>
      <div className="product__info">
        <h2 className="product__info__title">{title.substring(0, 20)}</h2>
        <p className="product__info__description">
          {description.substring(0, 100)}
          {" . . ."}
        </p>
        <p className="product__info__price">₹ {price}</p>
        <div className="product__info__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i.toString()}>🌟</p>
            ))}
        </div>
        <button onClick={addToCartHandler} className="product__info__button">
          Add to Cart
        </button>
      </div>
      {showSideNavCart && (
        <div className="sideNavCart">
          <div className="sideNavInnerCart">
            <motion.div
              ref={ref}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 100, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="headerBottomCloseIcon">
                <CloseIcon
                  onClick={() => setShowSideNavCart(false)}
                ></CloseIcon>
              </span>
              <div className="product__image__sidenav">
                <img src={image} alt="img" />
              </div>
              <div className="product__info_sidenav">
                <h2 className="product__info__title_sidenav">
                  {title.substring(0, 20)}
                </h2>
              </div>
              <p className="product__info__price__sidenav">₹ {price}</p>
              <p className="sidenavcart__text">Item Added to the cart!</p>
              <Link to="/cart">
                <button className="product__info__button nomarginsidenav">
                  Go to Cart
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;

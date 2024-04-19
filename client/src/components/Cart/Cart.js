import React, { useState, useEffect } from "react";
import "./Cart.css";
import CartBuyContainer from "./CartBuyContainer";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/amazonSlice";
import { emptyCart } from "../../assets/index";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Cart() {
  const cartArray = useSelector((state) => state.amazon);
  const dispatch = useDispatch();
  const cart = cartArray.cart;
  const totalProducts = cartArray.totalProducts;
  const totalCartPrice = cartArray.totalCartPrice;

  if (totalProducts === 0) {
    return (
      <motion.div
        initial={{ y: 70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="empty__cart"
      >
        <div className="empty__cart__cont">
          <div>
            <img src={emptyCart} alt="emptycart" className="empty__cart__img" />
          </div>
          <div className="empty__cart__content">
            <h1>Your Cart feels lonely</h1>
            <p>
              Your Shopping cart lives to serve. Give it purpose - fill it with
              books, electronics, videos, etc. and make it happy.
            </p>
            <Link to="/">
              <button>Continue Shopping</button>
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__left">
        <div className="cart__left__info">
          <div className="cart__title">Shopping Cart</div>
          <span className="cart__price">Price</span>
        </div>
        <hr className="cart__hr" />
        {cart.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
            quantity={item.quantity}
            description={item.description}
            rating={item.rating}
            category={item.category}
            
          ></CartItem>
        ))}

        <div className="cart__clear">
          <button
            onClick={() => {
              dispatch(clearCart());
            }}
          >
            Clear Cart
          </button>
        </div>
      </div>

      <div className="cart__right">
        <CartBuyContainer
          totalProducts={totalProducts}
          totalCartPrice={totalCartPrice}
        />
      </div>
    </div>
  );
}

export default Cart;

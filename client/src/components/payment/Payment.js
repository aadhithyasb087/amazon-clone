import React, { useState, useEffect } from "react";
import CartItem from "../Cart/CartItem";
import { Link } from "react-router-dom";
import "./Payment.css";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/amazonSlice";

function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);
  const navigate = useNavigate();
  const cartArray = useSelector((state) => state.amazon);
  const cart = cartArray.cart;
  const total = cartArray.totalCartPrice;
  const user = cartArray.userInfo;
  const dispatch = useDispatch();

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payment/create?total=${total * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, [total]);
  const handleCardSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    // const strClientSecret = clientSecret.toString();
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        if (paymentIntent) {
          db.collection("users")
            .doc(user?.uid)
            .collection("orders")
            .doc(paymentIntent?.id)
            .set({
              cart: cart,
              amount: paymentIntent.amount,
              created: paymentIntent.created,
            });
          setSucceeded(true);
          setError(null);
          setProcessing(false);
          dispatch(clearCart());
          navigate("/orders");
        }
      });
  };
  const handleCardElChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout <Link to="/cart">({cart?.length} items)</Link>
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>No:23,Anna Nagar West</p>
            <p>Chennai,Tamil Nadu</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {cart.map((item) => {
              return (
                <CartItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  rating={item.rating}
                  totalPrice={item.totalPrice}
                  hiddenEl
                  quantity={item.quantity}
                ></CartItem>
              );
            })}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onClick={handleCardSubmit}>
              <CardElement onChange={handleCardElChange} />
              <div className="payment__priceContainer">
                <h3>Order total: {total}</h3>
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing...</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

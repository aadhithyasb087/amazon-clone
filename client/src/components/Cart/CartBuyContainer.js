import React, { useEffect } from "react";
import "./CartBuyContainer.css";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../../firebase";
import { loadStripe } from "@stripe/stripe-js";
import { setOrderItems } from "../../redux/amazonSlice";
import Success from "../checkout/Success";

function CartBuyContainer({ totalCartPrice, totalProducts }) {
  const navigate = useNavigate();
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  const dispatch = useDispatch();
  // const [{ cart }, dispatch] = useStateValue();
  // const { total, formatTotal } = getCartTotal(cart);
  const cart = useSelector((state) => state.amazon.cart);
  const user = useSelector((state) => state.amazon.userInfo);

  const checkoutHandler = async () =>
  {
    if(!user._id){
      navigate('/login')
    }
    else
    {
      const stripe = await stripePromise;
      const checkoutSession = await axios.post(
        "https://amazon-clone-rvom.vercel.app/create-checkout-session",
        {
          cart,
          email: user.email,
        }
      );
     
      if (checkoutSession.data.session.id) {
        console.log(checkoutSession.data);
        const orderItems = {
          cart: cart,
          userId: user._id,
          created: checkoutSession.data.session.created,
          amount: checkoutSession.data.session.amount_total / 100,
          orderId: checkoutSession.data.session.id,
        };
        console.log("order", orderItems);
        dispatch(setOrderItems({ orderItems: orderItems }));
      }
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.data.session.id,
      });

      if (result.error) {
        dispatch(setOrderItems());
        alert(result.error.message);
      }
    }
    
   
  };

  return (
    <div className="cart__buy">
      <p className="cart__buy__freedelivery">
        <span>
          <CheckCircleIcon className="cart__buy__checkcircle" />
        </span>
        <span>
          <span>Your order qualifies for FREE Delivery.</span>
          <br />
          Choose <span>FREE</span> Delivery option at checkout.
        </span>
      </p>
      <p className="cart__buy__total">
        {/* Subtotal ({cart.length}): <strong>{formatTotal}</strong> */}
        Subtotal ({totalProducts}): <strong>₹ {totalCartPrice}</strong>
      </p>
      <small className="cart__buy__gift">
        <input type="checkbox" /> This order contains a gift
      </small>
      <button onClick={() => checkoutHandler()}>Proceed to Buy</button>
      <small className="test__card">
        For Payment Testing purpose use the below Test card details,
        <br />
        Visa card: 4000 0035 6000 0008
        <br />
        Exp Date : 11/25
      </small>
    </div>
  );
}

export default CartBuyContainer;

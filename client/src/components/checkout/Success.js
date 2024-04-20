import React, { useEffect } from "react";
import "./CheckoutResponse.css";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/amazonSlice";
import Redirect from "./Redirect";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
function Success() {
  const dispatch = useDispatch();
  const orderItem = useSelector((state) => state.amazon.orderItems);
    const user = useSelector((state) => state.amazon.userInfo);
  useEffect(() => {
    db.collection("users").doc(orderItem.userId).collection("orders").doc(orderItem.orderId).set({
        cart: orderItem.cart,
      created: orderItem.created,
        amount: orderItem.amount,
      });

    dispatch(clearCart());
  }, [dispatch]);
  return (
    <div className="checkout__response">
      <section>
        <p>
          Your order was successful!
          <br />
          We've sent a confirmation email to you.
        </p>
        <Redirect />
      </section>
    </div>
  );
}

export default Success;

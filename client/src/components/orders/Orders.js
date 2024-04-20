import React, { useState, useEffect } from "react";
import "./Orders.css";
import { useSelector, useDispatch } from "react-redux";
import {motion} from 'framer-motion'
import { db } from "../../firebase";
import Order from "../orders/Order";
import { emptyCart } from "../../assets";
import {Link,useNavigate} from 'react-router-dom'
function Orders() {
  // const [{ user }, dispatch] = useStateValue();
  const user = useSelector((state) => state.amazon.userInfo);

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    db.collection("users")
      .doc(user._id)
      .collection("orders")
      .orderBy("created", "desc")
      .onSnapshot((snapshot) => {
        setOrders(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, [user]);
  const navigate = useNavigate();
  
if (!user._id) {
  return navigate("/login");
}
  if (user._id && !orders.length) {
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
            <h1>Your Orders feels lonely</h1>
            <p>
              Your Orders lives to serve. Give it purpose - fill it with by ordering
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
    <div className="orders">
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map((order) => (
          <Order order={order}></Order>
        ))}
      </div>
    </div>
  );
}

export default Orders;

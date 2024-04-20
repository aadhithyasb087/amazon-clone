import React from "react";
import "./Order.css";
import moment from "moment";
import CartItem from "../Cart/CartItem";

function Order({ order }) {
  return (
    <div className="order">
      <p className="order__time">
        {moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}
      </p>

      
        <div className="order__items">
          {order.data.cart.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              image={item.image}
              rating={item.rating}
              totalPrice={item.totalPrice}
              quantity={item.quantity}
              hiddenButton
              hiddenEl
            ></CartItem>
          ))}
        </div>
      <div className="order__total">
        <h3>Order Total: ₹ {order.data.amount} </h3>
      </div>
    </div>
  );
}

export default Order;

import React from "react";
import "./CartItem.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteProduct } from "../../redux/amazonSlice";

function CartItem({
  id,
  image,
  title,
  price,
  description,
  quantity,
  hiddenButton,
  rating,
  category,
  hiddenEl,
  totalPrice,
}) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.amazon.cart);
  var quantityVal = 0;
  var totalPriceVal = 0;
  if (totalPrice) {
    totalPriceVal = totalPrice;
  } else {
    const tempTotalPrice = cart.filter((item) => item.id === id);
    totalPriceVal = tempTotalPrice.length ? tempTotalPrice[0].totalPrice : 0;
  }

  const removeItemHandler = () => {
    dispatch(deleteProduct({ id, totalPrice, quantity }));
  };
  const addItemHandler = () => {
    if (cart.length) {
      const item = cart.find((item) => item.id === id);
      quantityVal = item ? item.quantity : 0;
    }
    
    if (quantityVal < 10) {
      dispatch(
        addToCart({
          id: id,
          totalPrice: 0,
          price: price,
          quantity: quantity,
        })
      );
    } else {
      alert("Max Order:10. You have reached maximum order for this product");
    }
  };
  const removeOneItemHandler = () => {
    dispatch(
      deleteProduct({
        deleteOneItem: true,
        id: id,
        price: price,
        quantity: quantity,
      })
    );
  };
  return (
    <div className="cartitem">
      <div className="cartitem__image">
        <img src={image} alt="img" />
      </div>
      <div className="cartitem__info">
        <p className="cartitem__title">{title}</p>
        <p className="cartitem__description">{description}</p>
        <p className="cartitem__unitprice">
          Unit Price: <span>₹ {price}</span>
        </p>
        <div className="cartitem__quantity">
          <p className="cartitem__quantity__text">Qty:</p>
          {!hiddenEl && (
            <p className="cartitem__plusminus" onClick={removeOneItemHandler}>
              -
            </p>
          )}
          <p className="cartitem__quantity__val">{quantity}</p>
          {!hiddenEl && (
            <p className="cartitem__plusminus" onClick={addItemHandler}>
              +
            </p>
          )}
        </div>
        {!hiddenButton && (
          <button className="cartitem__remove" onClick={removeItemHandler}>
            Remove from Cart
          </button>
        )}
      </div>
      <div className="cartitem__price">
        <strong>₹ {totalPriceVal}</strong>
      </div>
    </div>
  );
}

export default CartItem;

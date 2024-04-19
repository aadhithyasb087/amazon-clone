import React from "react";
import "./Product.css";
// import { useStateValue } from "../state/StateProvider";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/amazonSlice";

function Product({ id, title, image, price, rating, description, category }) {
  // const [{ cart }, dispatch] = useStateValue();
  const dispatch = useDispatch();

  const addToCartHandler = () => {
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
        totalPrice:0,
      })
    );
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
        <button onClick={addToCartHandler}>Add to Cart</button>
      </div>
    </div>
  );
}

export default Product;

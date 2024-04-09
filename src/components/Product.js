import React from "react";
import './Product.css'

function Product({ title, image, price, rating }) {
  return (
    <div className="product">
      <div className="product__info">
              <p>{ title}</p>
        <div className="product__price">
          <small>₹</small>
                  <strong>{ price}</strong>
        </div>
              <div className="product__rating">
          {Array(rating)
            .fill()
            .map(() => (
              <p>🌟</p>
            ))}
         
        </div>
      </div>
      <img
        src={image}
        alt="product_img"
      />
      <button>Add to Cart</button>
    </div>
  );
}

export default Product;

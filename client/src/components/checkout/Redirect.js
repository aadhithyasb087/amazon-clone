import React from 'react'
import { Link } from "react-router-dom";
import "./Redirect.css"
function Redirect({cancel}) {
  return (
    <div className="checkout__redirect__outer">
      <div className="checkout__redirect">
        {cancel && (
          <Link to="/cart">
            <button>Cart</button>
          </Link>
        )}

        {!cancel && (
          <Link to="/orders">
            <button>Return & Orders</button>
          </Link>
        )}
        <Link to="/">
          <button>Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Redirect
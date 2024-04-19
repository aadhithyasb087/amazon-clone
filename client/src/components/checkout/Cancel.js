import React from "react";
import "./CheckoutResponse.css";
import Redirect from "./Redirect";
function Cancel() {
  return (
    <div className="checkout__response">
      <section>
        <p>
          Forgot to add something to your cart? Shop around then come back to
          pay!
        </p>
      <Redirect cancel/>
      </section>
    </div>
  );
}

export default Cancel;

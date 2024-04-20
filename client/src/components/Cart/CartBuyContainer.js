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
      // var checkoutSession="";
      // const Server_API="https://amazon-clone-rvom.vercel.app/create-checkout-session"
      // try{
      //   checkoutSession = await axios.post(Server_API,
      //   {
      //     cart,
      //     email: user.email,
      //   },
      // );
      // }
      // catch(e){
      //   console.log(e);
      // }

        
      // const checkoutSession = await axios.post(
      //   "https://amazon-clone-rvom.vercel.app/create-checkout-session",
      //   {
      //     cart,
      //     email: user.email,
      //   }
      // );



const line_items = cart.map((item) => {
    return {
      price_data: {
        currency: "INR",
        product_data: {
          name: item.title,
          images: [item.image],
          description: item.description,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });

  const chekoutSession = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ["US", "IN"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "INR",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "INR",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items: line_items,
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/checkout/success/`,
    cancel_url: `${YOUR_DOMAIN}/checkout/cancel/`,
    metadata: {
      email,
      images:JSON.stringify(cart.map(item=>{item.image}))
    },
  });
  console.log(checkoutSession);



      
      if (checkoutSession.data) {
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

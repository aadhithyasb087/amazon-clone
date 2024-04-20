const stripe = async ({
  stripePromise,
  stripeVar,
  email,
  cart,
  dispatch,
  user,
  setOrderItems,
}) => {
  const stripeClient = await stripePromise;
  const stripeServer = stripeVar(process.env.REACT_APP_STRIPE_SECRET_KEY);
  const YOUR_DOMAIN = "https://amazon-clone-ecru-seven.vercel.app/";
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

  const checkoutSession = await stripeServer.checkout.sessions.create({
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
    },
  });

  if (checkoutSession) {
    const orderItems = {
      cart: cart,
      userId: user._id,
      created: checkoutSession.created,
      amount: checkoutSession.amount_total / 100,
      orderId: checkoutSession.id,
    };
    dispatch(setOrderItems({ orderItems: orderItems }));
  }
  const result = await stripeClient.redirectToCheckout({
    sessionId: checkoutSession.id,
  });

  if (result.error) {
    dispatch(setOrderItems());
    alert(result.error.message);
  }
};

export default stripe;

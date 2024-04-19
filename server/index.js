// This is your test secret API key.
require("dotenv").config();
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const app = express();
app.use(express.json());
// const corsOptions = {
//   origin: "*",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// app.use(
//   cors({
//     origin: "http://localhost:3000", // use your actual domain name (or localhost), using * is not recommended
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
//     allowedHeaders: [
//       "Content-Type",
//       "Origin",
//       "X-Requested-With",
//       "Accept",
//       "x-client-key",
//       "x-client-token",
//       "x-client-secret",
//       "Authorization",
//       "Access-Control-Allow-Origin",
//     ],
//     credentials: true,
//   })
// );
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());
app.use(express.static("public"));

const YOUR_DOMAIN = "http://localhost:3000";

app.post("/create-checkout-session", async (req, res) => {
  const { cart, email } = req.body;
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

  const session = await stripe.checkout.sessions.create({
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
  console.log(session);
  res.json({ session: session });
});

app.listen(4242, () => console.log("Running on port 4242"));
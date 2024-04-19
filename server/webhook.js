import { buffer } from "micro";
var admin = require("firebase-admin");

var serviceAccount = require("./permission.json");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = !admin.app.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

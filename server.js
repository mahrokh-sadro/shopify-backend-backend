const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "config/keys.env" });
}
const ItemsController = require("./controllers/ItemsController.js");

const corsOptionsDelegate = function (req, callback) {
  const allowlist = [
    `http://localhost:3000`,
    "http://127.0.0.1:3000",
    "https://shopify-inventory-front.netlify.app",
    "http://shopify-inventory-front.netlify.app",
    "https://shopify-inventory-front.netlify.app/",
    "http://shopify-inventory-front.netlify.app/",
  ];
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
  }
  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "main page",
  });
});

app.use("/items", ItemsController);

const HTTP_PORT = process.env.PORT || 5000;
// const MONGO_DB_CONNECTION_STRING =
//   "mongodb+srv://661370:661370@cluster0.8i4ns.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
app.listen(HTTP_PORT, () => {
  console.log(`app is listenig on ${HTTP_PORT}`);

  mongoose
    // .connect(MONGO_DB_CONNECTION_STRING)
    .connect(process.env.MONGO_DB_CONNECTION_STRING)
    .then(() => console.log("connected to db " + HTTP_PORT))
    .catch((err) => console);
});

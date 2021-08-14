require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");

const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");

//myfunction().then().catch()

// DB CONNECTION
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch(() => {
    console.log("DB NOT CONNECTED ;(");
  });

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//MY ROUTES
app.use("/api", authRoutes);

//  PORT
const port = 8008;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

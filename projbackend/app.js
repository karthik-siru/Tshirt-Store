require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");

const app = express();

const cookieParser = require("cookie-parser");
const cors = require("cors");

// My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");

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
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//MY ROUTES
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);

//  PORT
const port = 8008;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});

const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const { userAuth } = require('./middleware/auth');
 const cors = require('cors');


app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");

app.use(cors({
    origin: "https://virtual-outfit-customisation-frnt.vercel.app",
    credentials: true,
}));

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",productRouter);
app.use("/",cartRouter);

app.get("/", (req, res) => {
    res.send("<h1>HI</h1>");
});

connectDB();
module.exports = app;


const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const { userAuth } = require('./middleware/auth');
const cors = require('cors');

// Configure CORS to allow requests from the frontend origin
app.use(cors({
    origin: "https://virtual-outfit-customisation-w41l.vercel.app", // Removed trailing slash
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

// Import routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");

// Handle preflight requests for all routes
app.options('*', cors());

// Apply routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", productRouter);
app.use("/", cartRouter);

app.get("/", (req, res) => {
    res.send("<h1>HI</h1>");
});

module.exports = app;
connectDB();

const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { userAuth } = require("./middleware/auth");
const app = express();

// CORS options to allow requests from the frontend origin
const corsOptions = {
    origin: "https://virtual-outfit-customisation-w41l.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
};

// Apply CORS globally
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Preflight handling

app.use(express.json());
app.use(cookieParser());

// Import routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");

// Apply routes with CORS
app.use("/auth", cors(corsOptions), authRouter);
app.use("/profile", cors(corsOptions), profileRouter);
app.use("/requests", cors(corsOptions), requestRouter);
app.use("/product", cors(corsOptions), productRouter);
app.use("/cart", cors(corsOptions), cartRouter);

// Root route
app.get("/", (req, res) => {
    res.send("<h1>HI</h1>");
});

// Preflight handling route
app.options("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "https://virtual-outfit-customisation-w41l.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    res.sendStatus(200);
});

module.exports = app;
connectDB();

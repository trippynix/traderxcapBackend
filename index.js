const express = require("express");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");
const router = require("./routes");

const app = express();

// ✅ CORS Setup (Ensure frontend can communicate)
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // Required for cookies & sessions to work across domains
  })
);

// ✅ Middleware Setup
app.use(express.json());
app.use(cookieParser());

// ✅ Session Setup
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Change this to a strong secret
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI, // Use your MongoDB connection string
      collectionName: "sessions",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // Only secure in production
      httpOnly: true, // Prevent client-side access to cookies
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// ✅ Routes
app.use("/api", router);

const PORT = process.env.PORT || 8080;

// ✅ Connect to DB and Start Server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Connected to DB`);
      console.log(`🌍 Server is running on port ${PORT}...`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed", err);
    process.exit(1);
  });

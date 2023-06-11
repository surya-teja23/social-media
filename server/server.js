require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const { fileURLToPath } = require("url");
const PORT = process.env.PORT || 3500;
const app = express();

// Connect to MongoDB
connectDB();

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));

// built-in middleware for json
app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use("/profile", express.static(path.join(__dirname, "/public/profile")));
app.use("/posts", express.static(path.join(__dirname, "/public/posts")));
app.use("/assets", express.static(path.join(__dirname, "/public/assets")));

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const { checkUser } = require("./middleware/authMiddleware");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

dotenv.config();
connectDB()

// express app
const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT;
app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold))

// register view engine
app.set("view engine", "ejs");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev"));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get("*", checkUser);

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

// User routes
app.use(authRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

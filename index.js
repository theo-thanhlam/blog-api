//App
const express = require("express");
const app = express();

//Setting
const cors = require("cors");
const cookiesParser = require("cookie-parser");

//Config
const { corsConfig } = require("./config/cors.config");

//Routes
const postRoutes = require("./routes/post.routes");
const authRoutes = require("./routes/auth.routes");

//App setting
app.use(cors(corsConfig));
app.use(express.json());
app.use(cookiesParser());

//Routes
app.use("/", authRoutes);
app.use("/post", postRoutes);

//Run
app.listen(process.env.PORT || 3001);

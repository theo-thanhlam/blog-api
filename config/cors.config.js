require("dotenv").config();

const corsConfig = {
  origin: process.env.CLIENT_URI,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable credentials (cookies, HTTP authentication) in the CORS request
  optionsSuccessStatus: 204, // Set the preflight response status to 204 (No Content)
};

module.exports = { corsConfig };

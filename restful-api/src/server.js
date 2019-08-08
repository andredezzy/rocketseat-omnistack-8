const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

const server = express();

mongoose.connect(
  "mongodb+srv://andredezzy:admin@tindev-djqvv.mongodb.net/tindev?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

server.use(cors());
server.use(express.json());
server.use(routes);

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
  console.log("Server has been started at: http://%s:%d", HOST, PORT);
});

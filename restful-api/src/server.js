const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const connectedUsers = {};

io.on("connection", socket => {
  console.log("New connection in the channel, socket -> ", socket.id);

  const { user } = socket.handshake.query;

  connectedUsers[user] = socket.id;
});

mongoose.connect(
  "mongodb+srv://andredezzy:admin@tindev-djqvv.mongodb.net/tindev?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
  console.log("Server has been started at: http://%s:%d", HOST, PORT);
});

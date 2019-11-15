var express = require("express");
var app = express();
var http = require("http").createServer(app);
var users = [];

var io = require("socket.io")(http);
http.listen(3000, function() {
  console.log("Server is up");
});

app.use(express.static("./"));

io.on("connection", function(socket) {
  users.push(socket);
  console.log(users.length + " users connected");
  socket.on("chat", function(message) {
    io.emit("chat", message);
  });

  socket.on("broadcast", function(data) {
    socket.broadcast.emit("broadcast", data);
  });
  socket.on("disconnect", function() {
    users.splice(0, users.length);
    console.log("user disconnected");
  });
});

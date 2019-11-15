var socket = io();
const form = document.getElementById("form");
const chat = document.getElementById("chat");
const username = document.getElementById("username");
const msgcontainer = document.querySelector(".msg-container");
var result = "";

form.addEventListener("submit", function() {
  event.preventDefault();
  socket.emit("chat", {
    username: username.value,
    chat: chat.value
  });
  chat.value = "";
});

socket.on("chat", function(message) {
  document.querySelector(".broadcast").innerHTML = "";
  const msgs = document.getElementById("msgs");
  result +=
    "<li><span class='user'>" +
    message.username +
    ":</span>" +
    message.chat +
    "</li>";
  msgs.innerHTML = result;
  //   const li = document.createElement("li");
  //   const textnode = document.createTextNode(
  //     message.username + ":" + message.chat
  //   );
  //   li.appendChild(textnode);
  //   msgs.appendChild(li);
});

chat.addEventListener("keypress", function() {
  socket.emit("broadcast", username.value);
});

socket.on("broadcast", function(data) {
  document.querySelector(".broadcast").innerHTML =
    "<em>" + data + " is typing a message...</em>";
});

const http = require("http");
const path = require("path");
const express = require("express");
const socket = require("socket.io");
const port = 3000;

const app = express();
const server = http.createServer(app);
const io = socket(server);


let state = {
  files: [
    {
      name: "index.html",
      content:
        `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
      
</body>
</html>`,
    },
  ],
  active: 0,
  mode: "htmlmixed",
};

io.on("connection", (socket) => {
  console.log(`client is connected ${socket.id}`);
  io.emit("broadcast", state);

  socket.on("emit", (arg) => {
    state = arg;
    socket.broadcast.emit("broadcast", state);
  });

  socket.on("disconnect", () => {
    console.log(`client is disconnected ${socket.id}`);
  });
});

// SPA
app.use(
  "/public",
  express.static(
    path.join(__dirname, "collaborative-code-editor-client", "public")
  )
);

app.get("*", (_req, res) => {
  res.sendFile(
    path.resolve(__dirname, "collaborative-code-editor-client", "index.html")
  );
});

server.listen(port, () => {
  console.log(`Server is listening on port: http://localhost:${port}`);
});
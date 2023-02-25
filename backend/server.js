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
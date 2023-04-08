//Importing Modules
const express = require("express");
const http = require("http");
const socket = require("./socket");

const { v4: uuidv4 } = require('uuid');

const app = express();
let cors = require('cors');
require("dotenv").config();

app.use(cors());

const server = http.createServer(app);

//Testing endpoint
app.get("/", (req, res) => {
    res.send({ msg: "edito server working fine." });
})

app.get("/getNewID", (req, res) => {
    // res.cookie('editoID', `${uuidv4()}`).send('cookie set');
    let id = uuidv4();
    res.send({ id });
})


// handling all socket logic 
socket(server)



server.listen(process.env.port, () => {
    console.log(`Serving at http://localhost:${process.env.port}`);
})
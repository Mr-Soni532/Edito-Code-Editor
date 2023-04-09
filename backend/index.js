//Importing Modules
const express = require("express");
const http = require("http");
const socket = require("./socket");
const controller = require('./controllers/code.controller')
let cors = require('cors');
const connectToMongo = require("./config/db");
const app = express();
app.use(cors());
app.use(express.json())

//=====> env variables
require("dotenv").config();
const PORT = process.env.PORT;

//=====> Created Server
const server = http.createServer(app);

//==========> ROUTES
app.get("/", controller.serverTesting)

app.post('/saveCode', controller.saveCode)
app.get('/fetchCode/:roomId', controller.fetchCodeByRoomId)

app.get("/generateUUID", controller.generateUUID)

// =========> SOCKET LOGIC
socket(server)

//=============> RUN SERVER
server.listen(PORT, async () => {
    try {
        await connectToMongo();
        console.log(`Edito backend @ port ${PORT}`)
    } catch (error) {
        console.log({msg: 'Something went wrong while listening the server ',error})
    }
})
//Importing Modules
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { v4: uuidv4 } = require('uuid');
const { userJoin, getRoomUsers, userLeave } = require("./utils/users");
const app = express();
let cors = require('cors');
require("dotenv").config();

app.use(cors());

const server = http.createServer(app);
const io = socketIo(server);

//Testing endpoint
app.get("/", (req, res) => {
    res.send({ msg: "edito server working fine." });
})

// execute when connection is established 
io.on('connection', (socket) => {

    socket.on("joinRoom", ({ username, roomId }) => {

        const user = userJoin(socket.id, username, roomId)
        socket.join(user.roomId);

        // Welcome Current user
        socket.emit('wlcm-message', `Welcome ${user.username}`)

        // Broadcast message
        socket.broadcast.to(user.roomId).emit('newUserAlert', user.username +' '+`has joined the workspace.`)

        // get all Users and room info
        io.to(user.roomId).emit('roomUsers', {
            users: getRoomUsers(user.roomId)
        })

    });

    // event for emitting the code_change 

    //! HTML
    socket.on("code_change_html", ({ roomId, code }) => {
        socket.broadcast.to(roomId).emit("code_change_html", { code })
    });

    //! CSS
    socket.on("code_change_css", ({ roomId, code }) => {
        socket.broadcast.to(roomId).emit("code_change_css", { code })
    });

    //! JavaScript
    socket.on("code_change_js", ({ roomId, code }) => {
        socket.broadcast.to(roomId).emit("code_change_js", { code })
    });

    // event for code sync
    socket.on("sync_code", (socketId, code) => {
        socket.broadcast.to(socketId).emit("code_change", { code });
    });

    // disconnect event
    socket.on('disconnect', () => {
        // Alert to all clients
        const user = userLeave(socket.id)
        if (user) {
            // send user and room info
            io.to(user.roomId).emit('roomUsers', {
                room: user.roomId,
                users: getRoomUsers(user.roomId)
            })
            io.to(user.roomId).emit('leftMessage', user.username + 'has left the workspace')
        }
        socket.leave();
    })
});

app.get("/getNewID", (req, res) => {
    // res.cookie('editoID', `${uuidv4()}`).send('cookie set');
    let id = uuidv4();
    res.send({ id });
})

server.listen(process.env.port, () => {
    console.log(`Serving at http://localhost:${process.env.port}`);
})
//Importing Modules
const express =  require("express");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();

//Creating Server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get("/", (req, res)=>{
    res.send("Home");
})


const user_socket_map = {};
function getAllConnectedClients(room_id) {
    return Array.from(io.sockets.adapter.rooms.get(room_id) || []).map(
        (socket_id) => {
            return {
                socket_id,
                username: user_socket_map[socket_id],
            };
        }
    );
}

io.on('connection', (socket) => {
    console.log('socket connected', socket.id);

    socket.on("join", (room_id, username) => {
        user_socket_map[socket.id] = username;
        socket.join(room_id);
        const clients = getAllConnectedClients(room_id);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit("join", {
                clients,
                username,
                socketId: socket.id,
            });
        });
    });

    socket.on("code_change", (room_id, code ) => {
        socket.in(room_id).emit("code_change", { code });
    });

    socket.on("sync_code", (socketId, code) => {
        io.to(socketId).emit("code_change", { code });
    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((room_id) => {
            socket.in(room_id).emit("disconnected", {
                socketId: socket.id,
                username: user_socket_map[socket.id],
            });
        });
        delete user_socket_map[socket.id];
        socket.leave();
    });
});

server.listen(process.env.port, ()=>{
    console.log(`Serving at http://localhost:${process.env.port}`);
})
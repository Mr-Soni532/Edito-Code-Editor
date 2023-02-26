// //Importing Modules
// const express =  require("express");
// const http = require("http");
// const socketIo = require("socket.io");
// require("dotenv").config();

// //Creating Server
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.get("/", (req, res)=>{
//     res.send("Home");
// })


// // object for storing all the users with socket id
// const user_socket_map = {};


// // function for getting the connecting clients for a separate room
// function getAllConnectedClients(room_id) {
//     return Array.from(io.sockets.adapter.rooms.get(room_id) || []).map(
//         (socket_id) => {
//             return {
//                 socket_id,
//                 username: user_socket_map[socket_id],
//             };
//         }
//     );
// }


// // Connection made
// io.on('connection', (socket) => {
//     console.log('socket connected', socket.id);


//     socket.on("join", (room_id, username) => {
//         // storing users with unique socket id
//         user_socket_map[socket.id] = username;
//         // joining room 
//         socket.join(room_id);
//         // getting all the clients for the room
//         const clients = getAllConnectedClients(room_id);
//         clients.forEach(({ socketId }) => {
//             io.to(socketId).emit("join", {
//                 clients,
//                 username,
//                 socketId: socket.id,
//             });
//         });
//     });

//     // event for emitting the code_change 
//     socket.on("code_change", (room_id, code ) => {
//         socket.in(room_id).emit("code_change", { code });
//     });

//     // this event is syncing all the code
//     socket.on("sync_code", (socketId, code) => {
//         io.to(socketId).emit("code_change", { code });
//     });

//     // disconnect event
//     socket.on('disconnecting', () => {
//         const rooms = [...socket.rooms];
//         rooms.forEach((room_id) => {
//             // emitting the 'disconnected event to frontend
//             socket.in(room_id).emit("disconnected", {
//                 socketId: socket.id,
//                 username: user_socket_map[socket.id],
//             });
//         });
//         // deleting the clientDetails after disconnecting
//         delete user_socket_map[socket.id];
//         socket.leave();
//     });
// });

// server.listen(process.env.port, ()=>{
//     console.log(`Serving at http://localhost:${process.env.port}`);
// })
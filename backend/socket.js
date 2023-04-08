const socketIO = require('socket.io')
const { userJoin, getRoomUsers, userLeave } = require("./utils/users");
module.exports = (server) => {
    const io = socketIO(server);

    io.on('connection', (socket) => {

        socket.on("joinRoom", ({ username, roomId }) => {
    
            const user = userJoin(socket.id, username, roomId)
            socket.join(user.roomId);
    
            // Welcome Current user
            socket.emit('wlcm-message', `Welcome ${user.username}`)
    
            // code sync for new user
            // socket.emit('renderCurrentCode')
    
            // Broadcast message
            socket.broadcast.to(user.roomId).emit('newUserAlert', user.username)
    
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
}
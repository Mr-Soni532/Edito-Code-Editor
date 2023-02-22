const express=require('express');
const socketio=require('socket.io');
const http=require('http');
const app=express();
const server=http.createServer(app);
const io=socketio(server);

io.on('connection',(socket)=>{
    console.log('Connection made successfully');
})

server.listen(3500,()=>{
    console.log('Listening at 3500');
})

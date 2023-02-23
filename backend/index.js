const express=require('express');
const socketio=require('socket.io');
const http=require('http');
require('dotenv').config();
const app=express();
// We can add routes here

const server=http.createServer(app);

const io=socketio(server);

io.on('connection',(socket)=>{
    
})

server.listen(process.env.port,()=>{
    console.log(`Running at Port:${process.env.port}`);
})
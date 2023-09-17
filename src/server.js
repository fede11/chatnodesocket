const express = require('express');
const {Server} = require('socket.io')
const app = express();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, ()=>console.log(`Server Port ${PORT}`));

app.use(express.static(__dirname+"/public"));

//Config websocket
const io = new Server(server);

const messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
 ];


//Detectar cada socket de un cliente que se conecte
io.on("connection",(socket)=>{
    console.log("Nuevo cliente conectado");
    //Enviar mensajes al cliente
    socket.emit("messagesChat", messages);

    //Recibir msg
    socket.on("newMsg", (data)=>{
        messages.push(data);
        //enviar los mensajes a todos los socket conecta2
        io.sockets.emit("messagesChat", messages)
    })
})
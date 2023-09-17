console.log("Funciona");

const socketClient = io();

const chatContainer = document.getElementById("chatContainer");

socketClient.on("messagesChat", (data) => {
    console.log(data)
    let messages="";
    data.forEach(element => {
        messages += `<p>Autor: ${element.author} - 
        Mensaje: ${element.text}</p>`
    });
    chatContainer.innerHTML = messages
})

//Capturar nombre de usuario
let user = "";
Swal.fire({
    title:"Bienvenido/a",
    text:"Ingresa tu nombre de usuario",
    input:"text",
    allowOutsideClick: false
}).then(response=>{
    console.log(response)
    user = response.value;
    document.getElementById("username").innerHTML = `Bienvenido/a ${user}`;
})

//Enviar un mensaje a nuestro server

const chatForm = document.getElementById("chatForm");

chatForm.addEventListener("submit", (event)=>{
    console.log("Form enviado");
    event.preventDefault();
    const message = {
        author: user,
        text: document.getElementById("messageChat").value
    }
    socketClient.emit("newMsg", message)
})

const http = require('http');
const express = require('express');
const app = express();
const websocket = require('ws');
const utils = require('./lib/index');

//let connection = null;
const server = http.createServer(app);

const ws = new websocket.Server({ 'port':3000, 'path':'/websocket' });

ws.on("open", (request) => {
    console.log("Websocket opened! Connection from: some device"); 
    ws.on("connection", (data)=>{
        let vehicleSpeed;
        utils.getSpeed()
        .then((res)=>{
            //TODO: Funcion que analice en tiempo real los datos de MongoDB (INTI).
            vehicleSpeed = JSON.stringify(res[0].paquete.Velocidad);
            data.send("Velocidad del vehiculo de " + vehicleSpeed + " km/hs");
        })
        .catch(e=>console.log(e));        
    });
});  
ws.on("message", (data)=>{
    console.log(data);
});

ws.on("close", ()=>console.log("Peer closed!"));


    
    //TODO: Verificar que sea para vehiculos en especifico y no para todos. *Se podría usar un token guardado en mongo para reconocer los vehiculos.
    //      Verificar que funcione correctamente. / Armar una función genérica para enviar datos a la App cliente.
        


app.listen(8000, ()=>{
    console.log("Server listening on port: 8000");
});

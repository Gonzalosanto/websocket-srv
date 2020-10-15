const http = require('http');
const express = require('express');
const app = express();
const websocket = require('ws');
const utils = require('./lib/index');
const { request } = require('express');

//const server = http.createServer(app);

const wss = new websocket.Server({ noServer:true });

wss.on("connection", (ws)=>{
    ws.on("message", (message)=>{
        console.log(message);
    });

    ws.on("close", ()=>{
        console.log("connection closed!")
    });

    let vehicleSpeed;
    utils.getSpeed()
    .then((res)=>{
        //TODO: Funcion que analice en tiempo real los datos de MongoDB (INTI).
        vehicleSpeed = JSON.stringify(res[0].paquete.Velocidad);
        ws.send("Velocidad del vehiculo de " + vehicleSpeed + " km/hs");

    });
});
const servidor = app.listen(8000, ()=>{
    console.log("Server listening on port: 8000");
});
servidor.on("upgrade", (request,socket,head)=>{
    wss.handleUpgrade(request,socket,head, (ws)=>{
        wss.emit("connection",ws,request);
    });
});


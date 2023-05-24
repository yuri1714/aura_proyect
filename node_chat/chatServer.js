//import { createServer } from 'https';

const mysql = require('mysql');
const express = require('express');
const app = express();
const cors = require('cors');

const { createServer } = require('http');
const { readFileSync } = require('fs');
const { WebSocketServer } = require('ws');

let clients = {};

//CORS error fixed
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(3000, () => {
    console.log('Servidor Express en ejecución');
});

const connection = mysql.createConnection({
    host: 'localhost', // change when push to server
    //host: 'auras.social',
    user: 'm07',
    password: 'm07',
    database: 'aura'
    });

    connection.connect((err) =>{
        if (err) throw err;
        console.log('Connected with PHPMyAdmin');
    });

const server = createServer(
    //{
    //   cert: readFileSync('/path/to/cert.pem'),
    //   key: readFileSync('/path/to/key.pem')
    //}
);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {

    console.log('cliente conectado');

    ws.on('error', () => {
        console.log('error');
    });

    ws.on('message', (data) => {
        data = JSON.parse(data);

        if (data.action === 'id') {
            console.log(data.idUser);
            clients[data.idUser] = ws;

        } else if (data.action === 'message') {
            if (clients[data.dest] != undefined) {
                console.log(data.dest);
                clients[data.dest].send(data.text);
            }
            console.log('antes del post')
            // Save message info to DDBB
            console.log('haciendo el post')
            const dest_user = data.dest;
            const sender_user = data.sender;
            const message = data.text;
            const query = `INSERT INTO chat_messages (dest_user, sender_user, message) VALUES ('${dest_user}', '${sender_user}', '${message}')`;
            connection.query(query, (error, results) => {
                if (error) throw error;
                console.log('results: ' + results);
            });

        }

    });

    ws.on('close', () => {
        console.log('client close');
        //falta eliminar ws de clients// delete clients[numerito];
    });

    //ws.send('something'); //send message
});

server.listen(6001, 'localhost');
/**
 * Created by Jérémie on 01/12/2017.
 * Updated by Jérémie Garcia on  07/12/2021q
 */

const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const kwiz = require('./kwiz_module/kwiz_module');

//make the server and the socketsio
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//server static file in the public directory
app.use(express.static(path.join(__dirname, '../client/build')));

//let idPlayer = "";

// Quand un client se connecte, on le note dans la console
io.on('connection', function (socket) {

    //send the questions to the client
    socket.emit("quiz", kwiz.questions());
    socket.emit("questionCount", kwiz.questions_count());
    socket.emit("toutesLesReponses", kwiz.get_answers_counts());

    // On crée le nouveau client si c est bon et on envoie aa tt le monde les informations
    socket.on("newClient", newClient => {
        if (kwiz.get_clients_names().includes(newClient)) {
            //On dit que le pseudo est deja occupé
            socket.emit("PseudoDejaOccupé", null);
        }
        else{
            //On dit que le pseudo est bon
            socket.emit("PseudoBon", null);
            kwiz.add_client(socket.id);
            kwiz.set_client_name(socket.id, newClient);
            socket.emit("nameNewClient", kwiz.get_client_name());
            io.emit("nameAllClient", kwiz.get_clients_names());
            io.emit("playerCount", kwiz.clients_count());
        }
    });

    //On remove le pseudo et on renvoie a tt le monde la nouvelle liste
    socket.on("removeClient", removeClient => {
        kwiz.remove_client(socket.id);
        io.emit("nameAllClient", kwiz.get_clients_names());
        io.emit("playerCount", kwiz.clients_count());
    });

    //Quand un client clique sur démarré, on le dit à tt le monde que la partie se lance
    socket.on("runGame", () => {
        io.emit("start", null);
    })

    //Quand un client répond à une question, on met à jours la liste et on renvoie la liste à tt le monde
    socket.on("ReponseQuestion", (question, option) => {
        kwiz.update_client_answer(socket.id, question, option);
        io.emit("toutesLesReponses", kwiz.get_answers_counts());
    });

    //Quand un client répond à une questionet que celle-ci est totalement répondu, on le dit à tt le monde
    socket.on("OnAFiniIci", (qId) => {
        io.emit("CestFini", qId);
    })
});

server.listen(8080);
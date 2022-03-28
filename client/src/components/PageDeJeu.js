import './../App.css';
import QuestionsComponent from './questions';
import InformationGameComponent from './informationGame';

import 'bootstrap/dist/css/bootstrap.css';
import React from "react";


export default function PageDeJeu ({questions, socket, name, clients_count}){

    //On lance les 2 composants de la page avec les informations dont ils ont besoins

    return (
        <div className="App">

            <InformationGameComponent name={name} clients_count={clients_count}></InformationGameComponent>

            <QuestionsComponent questions={questions} clients_count={clients_count} socket={socket}></QuestionsComponent>
        </div>
    )
}
import './App.css';
import QuestionsComponent from './components/questions';
import InformationGameComponent from './components/informationGame';
import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";

import 'bootstrap/dist/css/bootstrap.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ENDPOINT = "http://localhost:8080";
const socket = openSocket(ENDPOINT, { transports: ['websocket'] });


function App() {

    const [questions, setQuestions] = useState([]);
    const [questionsCount, setQuestionsCount] = useState(0);
    const [clients_count, setClients_count] = useState(0);
    // const [players, setPlayers] = useState([]);

    useEffect(() => {
        socket.on("quiz", data => {
            setQuestions(data.quiz);
        });
    }, []);

    useEffect(() => {
        socket.on("playerCount", nb_clients => {
            setClients_count(nb_clients);
        });
    }, []);
    // console.log(clients_count)

    useEffect(() => {
        socket.on("questionCount", data => {
            setQuestionsCount(data);
        });
    }, []);
    // console.log(questionsCount)

    // useEffect(() => {
    //     socket.on("addPlayer", clients_data => {
    //         setPlayers(clients_data);
    //     });
    // }, []);
    // console.log(players)



    return (
        <div className="App">
            <Container>
                <Row >
                    <Col className="header">
                        <h1 className="display-1 fw-bold">Kwizzz</h1>
                        <p className="display-5"> Interactive and Multi-User Quizz.</p>
                    </Col>
                </Row>
            </Container>

            <InformationGameComponent clients_count={clients_count}></InformationGameComponent>

            <QuestionsComponent questions={questions} socket={socket}></QuestionsComponent>

            <Container>
                <Row>
                    <footer id="site-footer">
                        <p>Copyright &copy;KWIZZZ 2021</p>
                    </footer>
                </Row>
            </Container>
        </div>
    );
}

export default App;

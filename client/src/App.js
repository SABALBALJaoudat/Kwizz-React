import './App.css';
import React, {useEffect, useState} from "react";
import openSocket from "socket.io-client";

import 'bootstrap/dist/css/bootstrap.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import PageDAccueil from "./components/PageDAccueil";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    // Link,
} from "react-router-dom";
import PageDeJeu from "./components/PageDeJeu";

const ENDPOINT = "http://localhost:8080";
const socket = openSocket(ENDPOINT, { transports: ['websocket'] });


function App() {
    const [questions, setQuestions] = useState([]);
    const [name, setName] = useState(" ");
    const [clients_count, setClients_count] = useState(0);

    //On recupere les questions, le nom du client et le nombre de participants
    useEffect(() => {
        socket.on("quiz", data => {
            setQuestions(data.quiz);
        });
    }, []);

    socket.on('nameNewClient', newClient => {
        setName(newClient);
    });

    socket.on("playerCount", nb_clients => {
        setClients_count(nb_clients);
    });
// s
    return (
        <div className="App">
            <Container>
                <Row >
                    <Col className="header">
                        <h1 className="display-1 fw-bold">Kwizzz</h1>
                        <p className="display-5"> Interactive and Multi-User Quizz. (SABALBAL Jaoudat)</p>
                    </Col>
                </Row>
            </Container>

            {/*On crée une route pour passer de la page d'acceuil à la page de jeu*/}
            <Router>
                <Routes>
                    <Route exact path="/" element={<PageDAccueil socket={socket}/>}/>
                    <Route exact path='/PageDeJeu' element={<PageDeJeu questions={questions} socket={socket} name={name} clients_count={clients_count}/>}/>
                </Routes>
            </Router>

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

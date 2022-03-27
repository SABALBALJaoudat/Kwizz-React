// import './App.css';
import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";

import 'bootstrap/dist/css/bootstrap.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import QuestionsComponent from "./components/questions";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

const ENDPOINT = "http://localhost:8080";
const socket = openSocket(ENDPOINT, { transports: ['websocket'] });


function Accueil() {
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

            <Container>
                <label>Pseudo</label>
                <textarea className="form-control" rows="1" id="comment" name="text"></textarea>
                <button type="button" className="btn btn-primary">Connexion</button>
            </Container>

            <Container>
                <Row>
                    <footer id="site-footer">
                        <p>Copyright &copy;KWIZZZ 2021</p>
                    </footer>
                </Row>
            </Container>
        </div>
    )
}

export default Accueil;
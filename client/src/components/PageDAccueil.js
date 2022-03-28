import React, {useEffect, useState} from "react";

import 'bootstrap/dist/css/bootstrap.css';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import {
    // BrowserRouter as Router,
    // Route,
    // Routes,
    Link, useNavigate,
} from "react-router-dom";



function PageDAccueil({socket}) {
    const navigate = useNavigate();
    const [names, setNames] = useState([]);

    //On récupere le nom de ts les clients
    useEffect(() => {
        socket.once('nameAllClient', allClient => {
            setNames(allClient);
        });
    });

    //Quand on clique sur le bouton pour ajouter un joueur
    function addNewPlayer() {
        //On envoie le pseudo au serveur
        socket.emit("newClient", document.getElementById('Pseudo').value);

        //Si le serveur nous dis que le pseudo est deja utilisé, on met une alert
        socket.once("PseudoDejaOccupé", () => {
            alert("Le pseudo est deja utilisé");
        })
        //Si le serveur nous dis que le pseudo est bon, on désactive ajouter et on active remove et démarer
        socket.on("PseudoBon", () => {
            document.getElementById("BtnJoin").className = "btn btn-primary mx-2 col-2 disabled";
            document.getElementById("BtnLeave").className = "btn btn-primary mx-2 col-2";
            document.getElementById("BtnDemarrer").className = "btn btn-primary col-2 my-2";
            document.querySelector('.form-control').disabled = true;
        })
    }

    //Si on souhaite se retiré, on envoie au serveur le pseudo qui se retire, et on desactive remove et begin et on active join
    function removeNewPlayer () {
        socket.emit("removeClient", document.getElementById('Pseudo').value);
        document.getElementById("BtnJoin").className = "btn btn-primary col-2 mx-2";
        document.getElementById("BtnLeave").className = "btn btn-primary col-2 mx-2 disabled";
        document.getElementById("BtnDemarrer").className = "btn btn-primary col-2 my-2 disabled";
        document.querySelector('.form-control').disabled = false;
    }

    //On envoie au serveur qu'une personne à cliqué sur Begin
    function runGame () {
        socket.emit("runGame", null);
    }

    // Quand le serveur recoit un start, on change pour la page des questions
    socket.on("start", () => {
        navigate("/PageDeJeu");
    })

    return (
        <div className="App">


            <div>
                <Container className="bg-warning">
                    <Row className="m-2">
                        <span>Ecrire le Pseudo :</span>
                    </Row>
                    <Row className="m-2">
                        <Col>
                            <textarea className="form-control" rows="1" cols="2" id="Pseudo" name="text" defaultValue=""/>
                        </Col>
                        <Col>
                            <button id="BtnJoin" className="btn btn-primary col-2 mx-2" onClick={addNewPlayer}>Join</button>
                            <span className="col-2"></span>
                            <button id="BtnLeave" className="btn btn-primary col-2 mx-2 disabled" onClick={removeNewPlayer}>Remove</button>
                        </Col>
                    </Row>
                    <Row className="m-2">
                        <Table>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                            </tr>
                            </thead>
                            <tbody>
                            {names.map((n, index) =>
                                <tr>
                                    <th>{index+1}</th>
                                    <th>{n}</th>
                                </tr>
                            )}
                            </tbody>
                        </Table>
                    </Row>
                    <Row className="m-2">
                        <Link type="button" id="BtnDemarrer" className="btn btn-primary col-2 my-2 disabled" to="/PageDeJeu" onClick={runGame}>Begin</Link>
                    </Row>

                </Container>
            </div>

        </div>
    )
}

export default PageDAccueil;
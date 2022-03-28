import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";


export default function InformationGameComponent ({name, clients_count}){

    //On affiche ici le nom du joueur ainsi que le nombre de participant

    return (
        <Container className="information border border-3 border-danger">
            <div style={{ color: 'black', fontStyle : 'oblique', fontWeight: 'bold'}}>
                <Row className="mx-2">
                    Nombre de joueur : {clients_count}
                </Row>
                <Row className="mx-2">
                    Nom Joueur : {name}
                </Row>
            </div>
        </Container>
    )
}

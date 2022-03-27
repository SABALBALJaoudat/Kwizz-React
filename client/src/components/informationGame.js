import React from "react";
import Container from "react-bootstrap/Container";

export default class InformationGameComponent extends React.Component{
    render() {
        // console.log(this.props.clients_count);
        return (
            <Container className="information">
                <div style={{ color: 'white' }}>
                    Nombre de joueur : {this.props.clients_count}
                </div>
            </Container>
        )
    }
}

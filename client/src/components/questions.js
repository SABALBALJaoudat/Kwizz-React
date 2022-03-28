import React, {useState} from "react";
import Container from "react-bootstrap/Container";
// import {forEach, map} from "react-bootstrap/ElementChildren";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";

export default function QuestionsComponent ({questions, socket, clients_count}) {
    const [tabReponse, setTabReponse] = useState([]);
    const [tabQClick, setTabQClick] = useState([]);


    //On compte le nombre de réponse sur la question si le joueur à déjà cliqué sur un bouton pour cette question
    function sommeFunc (liste, qId){
        let somme = 0;
        //On récupère le Int de l'Id de la question
        let qNumber = qId.replace( /^\D+/g, '') - 1;
        if (tabQClick[qNumber] === 1) {
            liste.map(q =>
                somme = somme + q
            )
        }
        return somme;
    }

    //On compte le nombre de réponse sur la question
    function sommeFunc2 (liste){
        let somme = 0;
        liste.map(q =>
            somme = somme + q
        )
        return somme;
    }

    //Permet de dire quand on a fini de rep à une question
    socket.on("CestFini", (qId) => {
        validateRep(qId);
    })

    function validateRep(qId) {
        //On récupère le Int de l'Id de la question
        let qNumber = null;
        qNumber = qId.replace( /^\D+/g, '');
        qNumber--;
        for (let i=0; i<questions[qNumber].options.length; i++) {
            //Si la réponse est la meme que la rép de la question, on dis que c est juste et on désactive le bouton
            if (questions[qNumber].answer === questions[qNumber].options[i]){
                document.getElementById(questions[qNumber].options[i]).className = "form-check-input is-valid";
                document.getElementById(questions[qNumber].options[i]).disabled = true;
            }
            //Si la réponse est la meme que la rép de la question, on dis que c est pas juste et on désactive le bouton
            else{
                document.getElementById(questions[qNumber].options[i]).className = "form-check-input is-invalid";
                document.getElementById(questions[qNumber].options[i]).disabled = true;
            }
        };
    }

    //Quand on clique sur un bouton
    function handleClick(q, opt) {
        socket.emit("ReponseQuestion", q.id, opt);

        //On récupère le Int de l'Id de la question sur lequel le joueur à cliqué et on l'enregistre dans un tableau
        let qId = q.id;
        let qNumber = qId.replace( /^\D+/g, '') - 1;
        tabQClick[qNumber] = 1;
        setTabQClick(tabQClick);

        //On récupère toutes les réponses qu'on enregistre dans un tableau
        socket.on("toutesLesReponses", reponse => {
            setTabReponse(reponse);
            //let rep = reponse[q.id];
            //Si la question est entièrement répondu, on l'envoie au serveur pour lui notifié l'id de la question
            let somme = sommeFunc2(reponse[q.id]);
            if(somme === clients_count){
                socket.emit("OnAFiniIci", q.id);
            }
        });


    }

    return (

        <Container className="questions border border-3 border-danger">
            <h2>Questions</h2>




            {questions.map((q, index) =>

                <div key={q.id} className="question-block">
                    <div className="question">
                        <h3 id="question_title">{q.id} : {q.question}</h3><br />


                        {q.options.map((opt, i) =>
                            <div key={q.id + "_" + opt}>

                                {/*Ici on dis qu'on affiche le nbr de votes pour la question si elle n'est pas vide et si la somme est supérieur à 0 si le joueur à cliqué dessus*/}

                                { (tabReponse[q.id] !== undefined && sommeFunc(tabReponse[q.id], q.id)>0) && <span id="nbReponse">{tabReponse[q.id][i]}/{clients_count}</span>}
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name={q.id} id={opt} onClick={() => handleClick(q, opt)} />
                                    <label className="form-check-label" htmlFor={opt}>
                                        {opt}
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>)}
        </Container>
    );
};
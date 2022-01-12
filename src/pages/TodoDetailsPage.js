import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { loadTaskFromApi } from "../api/http";

const TodoDetailsPage = () => {
    // Créons un état qui représentera la tâche à afficher
    // Par défaut sa valeur est null, mais on mettra à jour celle-ci
    // dès que l'API aura renvoyé les données de la tâche
    const [task, setTask] = useState(null);

    // useParams est un hook offert par ReactRouter qui permet
    // de retrouver les paramètres dans une URL.
    const params = useParams();

    // Comme nous sommes sur /:id/details (exemple : /120/details)
    // On peut retrouver dans ces params un élément "id" qui contiendra l'identifiant fourni (exemple : 120)
    const id = +params.id;

    // Un effet doit être lancé par React à chaque fois que l'ID change
    useEffect(() => {
        // On appelle l'API et lorsqu'on reçoit la tâche
        // correspondante, on remplace l'ancien state "task"
        // par les données que l'API a retourné
        loadTaskFromApi(id)
            .then(apiTask => setTask(apiTask));
    }, [id])

    // En fonction du state "task" (null ou pas), on retourne
    // un arbre JSX différent
    return task ?
        <>
            <h2>{task.text}</h2>
            <strong>Statut : </strong>
            {task.done ? "Fait" : "Pas fait"}
            <br />
            <Link to="/">Retour aux tâches</Link>
        </>
        :
        <p>Chargement en cours</p>
}

export default TodoDetailsPage;
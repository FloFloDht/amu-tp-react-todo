// src/pages/TodoDetailsPage.js

import React, { useState } from "react";
import { useParams } from "react-router-dom";

const TodoDetailsPage = () => {
    // useParams est un hook offert par ReactRouter qui permet
    // de retrouver les paramètres dans une URL.
    const params = useParams();

    // Comme nous sommes sur /:id/details (exemple : /120/details)
    // On peut retrouver dans ces params un élément "id" qui contiendra l'identifiant fourni (exemple : 120)
    const id = +params.id;

    console.log(id);

    return <>
        <p>ça fonctionne ! </p>
    </>
}

export default TodoDetailsPage;
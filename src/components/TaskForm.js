// src/components/TaskForm.js

import React, { useState } from "react";

const TaskForm = (props) => {
    // Créons un état (qui pourra évoluer dynamiquement) qui représentera
    // la chaîne tapée par l'utilisateur dans l'<input>
    const [text, setText] = useState('');

    // La fonction sera appelée à chaque changement sur l'<input>
    // Elle recevra les détails de l'événement
    const updateText = (event) => {
        // On fait évoluer le state "text" en remplaçant la valeur
        // acutelle par la valeur mise à jour de l'<input>
        setText(event.target.value);
    }

    // Cette fonction sera appelée lors de la soumission du <form> et recevra les détails de l'événement
    const handleSubmit = (event) => {
        // Annulons le comportement par défaut de l'événement
        // qui serait de recharger la page
        event.preventDefault();

       // Appelons la fonction onTaskAdded passée en props
       props.onTaskAdded(text);
    }

    return <form onSubmit={handleSubmit}>
        <input
            type="text"
            name="todo-text"
            placeholder="Ajouter une tâche"
            onChange={updateText}
            value={text}
        />
        <button>Ajouter</button>
    </form>
}

export default TaskForm;
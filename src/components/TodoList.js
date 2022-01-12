// src/components/TodoList.js

import React, { useState } from "react";

// On créé ici un tableau TODO_ITEMS qui contient deux objets 
const TODO_ITEMS = [
    { id: 1, text: "Faire les courses", done: false },
    { id: 2, text: "Aller chercher les enfants", done: true },
];

const TodoList = () => {
    // Créons un état (qui pourra évoluer dynamiquement) à partir du tableau TODO_ITEMS
    const [state, setState] = useState(TODO_ITEMS);

    const toggle = (id) => {
        // Récupérons l'index de la tâche concernée
        const idx = state.findIndex(task => task.id === id);
        // Créons une copie de la tâche concernée tout en modifiant son état
        const item = { ...state[idx], done: !state[idx].done };
        // Créons une copie du tableau d'origine
        const stateCopy = [...state];
        // Enfin remplaçons la tâche originale par la copie :
        stateCopy[idx] = item;
        // Et faisons évoluer le state : l'ancien tableau sera
        // remplacé par le nouveau, et le rendu sera déclenché à nouveau
        setState(stateCopy);
    }


    //créons un état (qui pourra évoluer dynamiquement) qui représentera la chaîne de tapée par l'utilisateur dans l'<input>
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
        //Annulons le comportement par défaut de l'événement qui serait de recharger la page 
        event.preventDefault();

        //Créons une nouvelle tâche avec le text tapé dans l'input
        const task = {
            id: Date.now,
            text: text,
            done: false
        };
        
        //Remplaçon le tableau de tâches actuel par une copie qui contiendra en plus la nouvelle tâche : 
        setState([...state, task]);
    }

    // On retourne une list <ul> qui contient un tableau d'éléments React
    // Chaque objet de TODO_ITEMS sera transformé en un <li> contenant les détails de la tâche
    // Les éléments React générés par une boucle doivent avoir une "key" unique
    return <>
      <ul>
          {state.map(item => <li key={item.id}>
              <label>
                  <input type="checkbox" id="todo-${item.id}" checked={item.done} onChange={() => toggle(item.id)} />
                  {item.text}
              </label>
          </li>)}
      </ul>
      <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="todo-text" 
            placeholder="Ajouter une tâche" 
            onChange={updateText} 
            value={text} 
          />
          <button>Ajouter</button>
      </form>
  </>
}

export default TodoList;
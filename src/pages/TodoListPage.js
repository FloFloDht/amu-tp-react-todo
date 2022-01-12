// src/pages/TodoListPage.js

import React, { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TodoList from "../components/TodoList";

const SUPABASE_URL = "https://bfxuknbmubeqdrtgqmrj.supabase.co/rest/v1/todosReact";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTgyNDk3MywiZXhwIjoxOTU3NDAwOTczfQ.KabUwP4iOJcH6PsOedizvsT3lrX4LSh7KDelwznXE3E"

const TodoListPage = () => {

    // Désormais, on prend un tableau vide comme valeur par défaut
    // pour la liste des tâches. Ce tableau évoluera lors du chargement
    // du composant grâce au useEffect ci-dessous
    const [state, setState] = useState([]);

    // On utilise le hook useEffect, qui permet de créer un comportement
    // qui aura lieu lors de CHAQUE rendu du composant React
    // mais en passant un tableau de dépendances vide en deuxième paramètres, on explique à React que ce comportement 
    // ne devra avoir lieu qu'une seule fois, au chargement du composant
    useEffect(() => {
        // Appel HTTP vers Supabase
        fetch(`${SUPABASE_URL}?order=created_at`, {
            headers: {
                apiKey: SUPABASE_API_KEY,
            },
        })
            .then((response) => response.json())
            .then((items) => {
                // On remplace la valeur actuel de state
                // par le tableau d'items venant de l'API
                setState(items);
            });
    }, []);
  

    const toggle = (id) => {
        // Récupérons l'index de la tâche concernée
        const idx = state.findIndex(task => task.id === id);
  
        // Créons une copie de la tâche concernée 
        const item = { ...state[idx] };
  
        // Appel HTTP en PATCH pour modifier la tâche
        fetch(`${SUPABASE_URL}?id=eq.${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                apiKey: SUPABASE_API_KEY,
                Prefer: "return=representation",
            },
            body: JSON.stringify({ done: !item.done }),
        }).then(() => {
            // Lorsque le serveur a pris en compte la demande et nous a répond
            // Nous modifions notre copie de tâche :
            item.done = !item.done;
  
            // Créons une copie du tableau d'origine
            const stateCopy = [...state];
            // Enfin remplaçons la tâche originale par la copie :
            stateCopy[idx] = item;
            // Et faisons évoluer le state : l'ancien tableau sera
            // remplacé par le nouveau, et le rendu sera déclenché à nouveau
            setState(stateCopy);
        });
    }

    const addNewTask = (text) => {
        // Créons une nouvelle tâche avec le text tapé dans l'input
        const task = {
            text: text,
            done: false
        };

        // Appel HTTP vers Supabase en method POST
       fetch(SUPABASE_URL, {
               method: "POST",
               body: JSON.stringify(task),
               headers: {
                   "Content-Type": "application/json",
                   apiKey: SUPABASE_API_KEY,
                   Prefer: "return=representation",
               },
           })
               .then((response) => response.json())
               .then((items) => {
                   setState([...state, items[0]]);
               });

        // Remplaçons le tableau de tâches actuel par une copie
        // qui contiendra en plus la nouvelle tâche :
        setState([...state, task]);
    }
    
    // Pour que nos composants profitent du state et des fonctions
    // associées, on leur transmet les informations nécessaires
    // via le biais des props
    return <>
        <TodoList tasks={state} onTaskToggle={toggle} />
        <TaskForm onTaskAdded={addNewTask} />
    </>
}

export default TodoListPage;
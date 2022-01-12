// src/app.js

// React va permettre de dessiner notre arbre d'éléments HTML
import React from "react";
// ReactDOM va permettre de créer le rendu correspondant dans le DOM HTML
import ReactDOM from "react-dom";
// On importe la fonction TodoList
import TodoList from "./components/TodoList";


// Imprime l'arbre renvoyé par TodoList() dans l'élément <main> du DOM HTML
ReactDOM.render(<TodoList />, document.querySelector('main'));
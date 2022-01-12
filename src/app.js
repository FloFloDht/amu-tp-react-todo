// src/app.js

// React va permettre de dessiner notre arbre d'éléments HTML
import React from "react";
// ReactDOM va permettre de créer le rendu correspondant dans le DOM HTML
import ReactDOM from "react-dom";

// BrowserRouter permet de fournir à tous les composants qu'il contient des outils relatifs au routage
// Routes permet de décrire la configuration des routes
// Route permet de décrire la configuration d'une route (url => composant à afficher)
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TodoDetailsPage from "./pages/TodoDetailsPage";
import TodoListPage from "./pages/TodoListPage";

const App = () => {
    return <BrowserRouter>
        <Routes>
            <Route
                path="/:id/details"
                element={<TodoDetailsPage />}
            />
            <Route
                path="/"
                element={<TodoListPage />}
            />
        </Routes>
    </BrowserRouter>
}

// Imprime l'arbre renvoyé par App() dans l'élément <main> du DOM HTML
ReactDOM.render(<App />, document.querySelector('main'));
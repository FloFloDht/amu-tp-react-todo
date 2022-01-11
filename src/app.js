// src/app.js

// React va permettre de dessiner notre arbre d'éléments HTML
import React from "react";
// ReactDOM va permettre de créer le rendu correspondant dans le DOM HTML
import ReactDOM from "react-dom";

/**
 * Créé et retourne un arbre d'éléments React
 * @returns React.DetailedReactHTMLElement
 */
const Hello = () => {
    return <div className="exemple-class exemple-classe-2" id="lorem id">
        <p>
            <strong>Hello</strong> World ! 
        </p>
    </div>
    // On créé un élément <div> qui aura les classes "example-class" et "example-class-2", ainsi que l'id "lorem-id"
    // return React.createElement('div', { className: "example-class example-class-2", id: "lorem-id" }, [
    //     // Contenant un élement <p>
    //     React.createElement('p', {}, [
    //         // Contenant lui même un élément <strong> qui contient la string "Hello "
    //         React.createElement('strong', {}, "Hello "),
    //         // Et un élément TEXT "World"
    //         "World"
    //     ])
    // ]);
}

// Imprime l'arbre renvoyé par hello() dans l'élément <main> du DOM HTML
// ReactDOM.render(React.createElement(Hello), document.querySelector('main'));
ReactDOM.render(<Hello/>, document.querySelector('main'));
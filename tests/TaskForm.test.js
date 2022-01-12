// tests/TaskForm.test.js

import { fireEvent, render, screen } from "@testing-library/react";
import TaskForm from "../src/components/TaskForm";
import React from "react"

// On souhaite s'assurer que lorsque l'utilisateur soumet le formulaire
// La fonction qu'on a passé en props du composant TaskForm sera bien appelée  :
it("should call prop function on submit", async () => {
    // Créons une fausse fonction qui n'appelera donc pas l'API
    // via HTTP
    const mockFunction = jest.fn();

    // On déclenche le rendu du composant TaskForm en lui confiant
    // notre fausse fonction pour la props onTaskAdded
    render(<TaskForm onTaskAdded={mockFunction} />);

    // On simule un événement de changement sur l'<input> dont le placeholder est
    // "Ajouter une tâche" et on spécifie le texte qui aurait été tapé par le visiteur (MOCK_TEXT)
    fireEvent.change(screen.getByPlaceholderText("Ajouter une tâche"), {
        target: { value: "MOCK_TEXT" }
    });

    // On simule ensuite un click sur le bouton dont le texte est "Ajouter"
    // Ce qui devrait déclencher le submit du formulaire
    fireEvent.click(screen.getByText("Ajouter"));

    // On veut s'assurer alors que la fonction qui doit prendre en charge
    // Cette nouvelle tâche est bien appelée ET qu'elle est appelée
    // avec pour paramètre le texte présent dans l'<input>
    expect(mockFunction).toHaveBeenCalledWith("MOCK_TEXT");
})
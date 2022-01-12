// tests/TodoListPage.test.js

import { fireEvent, render, screen } from "@testing-library/react";
import React from "react"
import { act } from "@testing-library/react";
import { addTaskToApi, loadTasksFromApi } from "../src/api/http";
import TodoListPage from "../src/pages/TodoListPage";
import { BrowserRouter } from "react-router-dom";

// Très important : nous décidons ici que TOUTES les fonctions du module http.js vont être MOCKEES (simulées)
// On va donc pouvoir les surveiller, savoir si elles ont été appelées, et même décider de ce qu'elles retourneront !
// On s'assurera donc que l'API réelle ne sera jamais appelée pendant nos tests
// C'est aussi pour ça qu'il est important de factoriser ce genre de méthodes dans un module à part, nous
// permettant ainsi de tout mocker d'un seul coup et de se substituer à ces fonctionnalités pendant nos tests
jest.mock("../src/api/http");

it("should add a task on form submit", async () => {
    // Avant de pouvoir appeler le composant App, il faut s'assurer que
    // les méthodes du module http.js soient définies correctement
    // Commençons par la méthode loadTasksFromApi() et faisons en sorte qu'elle retourne un tableau avec une tâche
    loadTasksFromApi.mockResolvedValue([
        { id: 1, text: "MOCK_TASK_1", done: false }
    ]);

    // On sait aussi que si l'on soumet le formulaire, la fonction addTaskToApi
    // sera appelée, il faut donc, elle aussi, la simuler de telle sorte qu'elle retourne 
    // une tâche similaire à celle qu'elle va recevoir, si ce n'est qu'elle y ajoutera
    // un identifiant, tel que l'aurait fait Supabase lors de cet appel API
    addTaskToApi.mockImplementation((task) => Promise.resolve({ ...task, id: 2 }))

    // Comme notre TodoListPage contient un hook useEffect, le fait même
    // de rendre le composant va occasionner un changement de state, il est recommandé
    // de l'encapsuler dans une fonction act().
    // Plus encore, comme notre useEffect fait appel à une fonction qui renvoi une Promesse (asynchrone)
    // il nous faut await le render(), et donc aussi await le act()
    await act(async () => {
        await render(
            <BrowserRouter>
                <TodoListPage />
            </BrowserRouter>
        );
    });

    // On peut d'ores et déjà confirmer qu'une fois notre composant rendu,
    // grâce à son useEffect, il aura appelé l'API et aura affiché la tâche
    // renvoyée :
    const itemsBeforeForm = screen.getByText("MOCK_TASK_1", { exact: false });
    expect(itemsBeforeForm).toBeTruthy();

    // On veut maintenant vérifier le bon fonctionnement du formulaire, celui-ci aussi est sensé
    // faire évoluer le state du composant, il est donc recommandé de l'encapsuler dans un act().
    // Plus encore, on sait que le state n'évoluera qu'à la fin de l'appel HTTP à l'API, donc de façon non synchrone,
    // Il faut donc attendre que ce soit fait en faisant un await de act()
    await act(async () => {
        // Le fait de changer le texte dans l'<input> du formulaire fera aussi évoluer
        // un state, on veut donc être sur que le state ait bien fini d'évoluer avant de continuer,
        // on va donc await la fin de l'événément change
        await fireEvent.change(screen.getByPlaceholderText("Ajouter une tâche"), {
            target: { value: "MOCK_TASK_2" }
        });

        // On pourra alors cliquer sur le bouton de soumission
        fireEvent.click(screen.getByText("Ajouter"));
    })

    // On peut désormais s'assurer qu'en cherchant tous les éléments qui contiennent
    // le terme "MOCK_TASK", on en trouvera bien 2 (la tâche MOCK_TASK_1, présente depuis le départ,
    // et la tâche MOCK_TASK_2 qu'on vient d'ajouter via le formulaire)
    const items = screen.getAllByText("MOCK_TASK", { exact: false });
    expect(items).toHaveLength(2);
})
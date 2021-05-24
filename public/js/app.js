
const app = {
    // pour pouvoir fetch sur notre API
    base_url: 'https://argonaute-wild.herokuapp.com',

    // fonction d'initialisation, lancée au chargement de la page
    init: async () => {
        console.log('app init');
        
        //au chargement de la page, on souhaite récupérer les listes existantes en BDD
        //La méthode étant déclarée async, on doit attendre qu'elle ait terminé son traitement avant de passer à la suite
        await app.getArgonautesFromAPI();

        //ajout au chargement de la page de la méthode qui va gérer les ajouts des EventListeners
        app.addListenerToActions();
    },

    // Ecoute d'évènements
    addListenerToActions: () => {
        //on cible le formulaire d'ajout d'un(e) argonaute 
        const form = document.querySelector('form');
        form.addEventListener('submit', app.handleAddArgonauteForm);
    },

    // Méthode pour soumettre le formulaire à la bdd
    handleAddArgonauteForm: async event => {
        //On évite le rechargement de la page lors du submit
        event.preventDefault();

        const target = event.target
        //on récupère les data du formulaire dans un FormData qui va nous faciliter la vie
        //FormData est capable d'extraire tous les inputs d'une balise <form> quelque soit leur niveau d'imbrication dans le html
        const formData = new FormData(target);
        
        // On réaffiche la value de l'input à zéro
        target.querySelector('input').value = '';

        try {

            //on utilise fetch en POST pour envoyer les infos à l'API et ajouter le nouveau argonaute en BDD
            const result = await fetch(`${app.base_url}/v1/argonaute`, {
                method: 'POST',
                body: formData
            });

            if (result.ok) { // si résultat est ok alors on peut construire le nouvel argonaute et l'afficher sur le DOM
                const json = await result.json();
                app.makeInDOM(json);
            } else {
                //ON récupère le message d'erreur que l'API nous a renvoyé
                const errorJson = await result.json();
                
                // On affiche une alerte pour informer que l'argonaute est déjà présent dans la liste.
                const name = errorJson.split(/\=\((.+)\)/gm)[1];

                if (!name) {
                    alert('Veuillez saisir un nom dans le formulaire')
                } else {
                    alert(`Attention le nom ${name} est déjà présent dans la liste. Veuillez en saisir un autre`); 
                }
            }

        } catch (error) {
            console.error('Impossible d\'ajouter la liste', error);
        }
    },

    // Méthode pour récupérer tous les argonautes présent en db
    getArgonautesFromAPI: async () => {
        try {
            const result = await fetch(`${app.base_url}/v1/argonaute`);

            if(result.ok) {
                const json = await result.json();
                //avec fetch, on obtient un tableau d'objects argonautes
                //Pour créer les argonautes dans le DOM, on boucle sur ce tableau et pour chaque élément, on appelle la méthode makeInDOM
                for(const argonaute of json) {
                    app.makeInDOM(argonaute);
                }
            } else {
                console.error('Pépin au niveau du serveur');
            }
        } catch (error) {
            console.error('Impossible de charger les listes depuis l\'API', error);
        }
    },

    // Méthode pour injecter les argonautes dans le DOM
    makeInDOM: data => {
        // On récupère le noeud pour insérer les informations venant de la bd
        const section = document.getElementsByClassName('member-list');

        //On crée nos élements
        const div = document.createElement('div');
        div.className = 'member-item';
        div.textContent = data.name;
        
        // On l'injecte dans le DOM
        section[0].appendChild(div);
    },
}






// On accroche un écouteur d'évènement sur le document : quand le chargement est terminé, on lance app.init
document.addEventListener('DOMContentLoaded', app.init);
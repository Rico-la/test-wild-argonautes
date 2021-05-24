// Lecture de nos données ENVVAR
require('dotenv').config();

//* Modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const multer = require('multer');

//* Initialisation de notre app
const app = express ();
const bodyParser = multer();
// PORT
const PORT = process.env.PORT || 5555;

//* Mise en place d'un router.
const router = require('./app/router');

// on utlise .none() pour dire qu'on attends pas de fichier, uniquement des inputs "classiques" !
app.use(bodyParser.none());

//* Utilisation d'un logger pour la phase de dev
app.use(morgan('tiny'));

// //* Paramétrage pour permettre de le 'req.body'
app.use(express.json());

//* Paramétrage des CORS pour permettre de request l'api
app.use(cors({
    origin: '*'
}));

//* On ajoute le dossier des ressources statiques
app.use(express.static('./public'));

//* Routage
app.use('/v1', router);

app.listen(PORT, () =>  console.log(`Server running on http://localhost:${PORT}`));
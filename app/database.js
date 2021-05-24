//* On sépare les préoccupations : SoC
//* Ce module va uniquement gérer la connexion à la base argonaute

//* On commence par importer mes variables d'environnement (contenu de .env)
require('dotenv').config();

//* On importe la classe Client depuis le module pg
const { Client } = require('pg');

//* On crée une instance
//* Cette instance est notre lien JS vers la BDD
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
      }
});

//* On connecte le client pour le rendre prêt à l'emploi
client.connect();

//* On place le client connecté dans l'export pour le rendre disponible dans d'autres fichiers de notre appli
module.exports = client;
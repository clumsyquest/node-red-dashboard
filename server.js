const RED = require("node-red");
const express = require("express");
const app = express();
const server = require("http").createServer(app);

// Paramètres de configuration de Node-RED
const settings = {
    httpAdminRoot: '/red',
    httpNodeRoot: '/api',
    userDir: './.nodered/', // Le répertoire où Node-RED stocke ses données
    functionGlobalContext: { }, // Contenu global que tu veux exposer aux fonctions
    flowFile: 'flow.json', // Indique ici ton fichier de flux
    // Tu peux ajouter d'autres options de configuration selon tes besoins
};

// Démarrer Node-RED
RED.init(server, settings);

// Middleware pour servir l'interface utilisateur de Node-RED
app.use(settings.httpAdminRoot, RED.httpAdmin);

// Middleware pour gérer les API de Node-RED
app.use(settings.httpNodeRoot, RED.httpNode);

// Démarrer le serveur
server.listen(process.env.PORT, () => {
    console.log(`Node-RED listening on port ${process.env.PORT}`);
});

// Lancer Node-RED
RED.start();

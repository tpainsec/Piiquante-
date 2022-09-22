// Importation d'express
const express = require('express');

// Importation de mongoose
const mongoose = require('mongoose');

// Mettre en place le chemin d'accès à un fichier téléchargé par l'utilisateur
const path = require('path');

// Déclaration des routes
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// Configuration de la base de données MongoDB
mongoose.connect('mongodb+srv://admin:24446666688888889@piiquante.u1sibz0.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Lancement d'express
const app = express();

// Headers CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.AUTHORIZED_ORIGIN);
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();  
}); 

// Conversion en JSON
app.use(express.json()); 

// Middleware de téléchargement de fichiers (images des sauces)
app.use('/images', express.static(path.join(__dirname, 'images')));

// Lancement des routes
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;
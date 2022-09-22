// Import du package multer (gestion de fichiers)
const multer = require('multer');

const MINE_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Configuration du chemin et du nom pour les fichiers entrants
const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, 'images')
    },
    filename : (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MINE_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Création du middleware 
module.exports = multer({ storage: storage }).single('image');
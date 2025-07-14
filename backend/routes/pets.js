const express = require('express');
const router = express.Router();
const multer = require('multer');
const petController = require('../controllers/petController');

// Configure multer storage, for example storing files in ./uploads folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Make sure this folder exists or create it
  },
  filename: function (req, file, cb) {
    // Set filename to be unique: e.g. timestamp + originalname
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Routes
router.get('/', petController.getAllPets);
router.post('/', upload.single('image'), petController.createPet); // <-- use multer middleware here
router.put('/:id', petController.updatePet);
router.delete('/:id', petController.deletePet);

module.exports = router;

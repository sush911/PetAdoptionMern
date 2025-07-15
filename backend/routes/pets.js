const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const petController = require('../controllers/petController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

router.get('/', verifyToken, verifyAdmin, petController.getAllPets);
router.post('/', verifyToken, verifyAdmin, upload.single('image'), petController.createPet);
router.put('/:id', verifyToken, verifyAdmin, upload.single('image'), petController.updatePet);
router.delete('/:id', verifyToken, verifyAdmin, petController.deletePet);

module.exports = router;

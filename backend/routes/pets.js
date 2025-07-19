const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const petController = require('../controllers/petController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// ✅ Public (authenticated) access
router.get('/', verifyToken, petController.getAllPets);

// ✅ Admin-only
router.post('/', verifyToken, verifyAdmin, upload.single('image'), petController.createPet);
router.put('/:id', verifyToken, verifyAdmin, upload.single('image'), petController.updatePet);
router.delete('/:id', verifyToken, verifyAdmin, petController.deletePet);

module.exports = router;

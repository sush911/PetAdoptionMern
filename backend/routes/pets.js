const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const multer = require('multer');
const path = require('path');
const { verifyToken, verifyAdmin } = require('../middleware/auth'); // import middleware

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),  // folder relative to backend root
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Protect all pet routes with verifyToken + verifyAdmin middleware
router.get('/', verifyToken, verifyAdmin, petController.getAllPets);
router.post('/', verifyToken, verifyAdmin, upload.single('image'), petController.createPet);
router.put('/:id', verifyToken, verifyAdmin, upload.single('image'), petController.updatePet);
router.delete('/:id', verifyToken, verifyAdmin, petController.deletePet);

module.exports = router;

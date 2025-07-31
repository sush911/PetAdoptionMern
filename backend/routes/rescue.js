const express = require('express');
const router = express.Router();
const rescueController = require('../controllers/rescueController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

// ✅ Public route - Anyone can submit a rescue
router.post('/', rescueController.createRescue);

// 🔐 Admin only routes
router.get('/', verifyToken, verifyAdmin, rescueController.getAllRescues);
router.get('/:id', verifyToken, verifyAdmin, rescueController.getRescueById);
router.put('/:id', verifyToken, verifyAdmin, rescueController.updateRescue);
router.delete('/:id', verifyToken, verifyAdmin, rescueController.deleteRescue);

module.exports = router;

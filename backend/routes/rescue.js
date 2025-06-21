const express = require('express');
const router = express.Router();
const rescueController = require('../controllers/rescueController'); 

router.get('/', rescueController.getAllRescues);
router.get('/:id', rescueController.getRescueById);
router.post('/', rescueController.createRescue);
router.put('/:id', rescueController.updateRescue);
router.delete('/:id', rescueController.deleteRescue);

module.exports = router;

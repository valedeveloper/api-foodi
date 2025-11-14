const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItems.controller.js');

router.get('/', orderItemController.getAll);
router.get('/:id', orderItemController.getById);
router.post('/', orderItemController.create);
router.put('/:id', orderItemController.update);
router.delete('/:id', orderItemController.delete);

module.exports = router;

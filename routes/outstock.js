const express = require('express');
const router = express.Router();

const stockController = require('../controllers/outstock-controller')

// http://localhost:8000/stocks/driver
router.post('/out', stockController.dispatchStock);
router.get('/out', stockController.index);
router.get('/out/:id', stockController.show);
router.post('/out/destroy/:id', stockController.destroy);
router.post('/out/amend/:id', stockController.update);

module.exports = router;

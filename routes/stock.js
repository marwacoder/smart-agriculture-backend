const express = require('express');
const router = express.Router();

const stockController = require('../controllers/stock-controller')

// http://localhost:8000/stocks/user
router.post('/', stockController.addStock);
router.get('/', stockController.index);
router.get('/:id', stockController.show);
router.post('/destroy/:id', stockController.destroy);
router.post('/amend/:id', stockController.update);



module.exports = router;

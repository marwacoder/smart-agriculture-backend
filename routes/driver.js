const express = require('express');
const router = express.Router();

const driverController = require('../controllers/driver-controller')

// http://localhost:8000/stocks/driver
router.post('/', driverController.addDriver);
router.get('/getAll', driverController.index);
router.get('/:id', driverController.show);
router.post('/destroy/:id', driverController.destroy);
router.post('/amend/:id', driverController.update);


module.exports = router;

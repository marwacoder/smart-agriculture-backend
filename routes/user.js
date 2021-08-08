const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller')

// http://localhost:8000/stocks/user
router.post('/', userController.create);
router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/destroy/:id', userController.destroy);
router.post('/amend/:id', userController.update);
router.post('/login', userController.login);

module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.create);
router.get('/users', userController.index);

module.exports = router;

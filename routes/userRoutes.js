const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');


router.get('/', userController.listUser);
router.post('/', userController.createUser);
router.get('/profile', authMiddleware, userController.getProfile);

module.exports = router;

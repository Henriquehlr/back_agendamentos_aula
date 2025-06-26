const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

router.get('/', authMiddleware, userController.listUser);
router.post('/', userController.createUser);
router.get('/profile', authMiddleware, userController.getProfile);
router.put("/:id", authMiddleware, userController.updatePermissions);
router.put('/update', authMiddleware, userController.updateUser);

module.exports = router;

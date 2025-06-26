const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

router.get('/', authMiddleware, userController.listUser);
router.post('/', authMiddleware, userController.createUser);
router.get('/profile', authMiddleware, userController.getProfile);
router.put("/:id", authMiddleware, userController.updatePermissions);

module.exports = router;

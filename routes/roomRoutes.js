const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/", authMiddleware, roomController.createRoom);
router.put("/:id", authMiddleware, roomController.updateRoom);
router.get("/", authMiddleware, roomController.listRooms);

module.exports = router;

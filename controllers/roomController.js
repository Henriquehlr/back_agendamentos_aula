const { Room } = require("../models");
const registerLog = require("../utils/registerLog");

exports.listRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.createRoom = async (req, res) => {
  try {
    const { name, scheduleTime, timeBlock, date } = req.body;
     const userId = req.user?.id || 0;

    const room = await Room.create({ name, scheduleTime, timeBlock, date });
console.log("                                 Matheusdobrega@email.com",  userId)
    await registerLog({
      name: "Admin",
      activityType: `Criação da sala ${name}`,
      module: "Admin - Salas",
      userId: userId,
    });

    res.status(201).json(room);
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, scheduleTime, timeBlock, date } = req.body;

    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    await room.update({ name, scheduleTime, timeBlock, date });

    await registerLog({
      name: "Admin",
      activityType: `Atualização da sala ${name}`,
      module: "Admin - Salas",
      userId: req.user.id,
    });

    res.json(room);
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

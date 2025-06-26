const { Room } = require("../models");

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

    const room = await Room.create({ name, scheduleTime, timeBlock, date });
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
    res.json(room);
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

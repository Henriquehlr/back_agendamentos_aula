const { Booking } = require('../models');

module.exports = {
  async createBooking(req, res) {
    const { room, date, startTime, endTime } = req.body;
    const userId = req.user.id; // Presume que você está usando middleware JWT que popula req.user

    try {
      // Aqui você pode adicionar lógica para checar conflitos de horário, por exemplo

      const booking = await Booking.create({
        room,
        date,
        startTime,
        endTime,
        userId,
      });

      return res.status(201).json(booking);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao criar agendamento' });
    }
  },

  async listBookings(req, res) {
    try {
      const bookings = await Booking.findAll({
        include: 'user', // Inclui dados do usuário associado
      });
      return res.json(bookings);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao listar agendamentos' });
    }
  },
};

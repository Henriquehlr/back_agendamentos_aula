const { Booking } = require('../models');

module.exports = {
  async createBooking(req, res) {
    const { room, date, startTime, endTime } = req.body;
    const userId = req.user.id; 

    try {
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
        include: 'user',
      });
      return res.json(bookings);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao listar agendamentos' });
    }
  },

  // ✅ Aprovar agendamento
  async approveBooking(req, res) {
    try {
      const { id } = req.params;
      const booking = await Booking.findByPk(id);

      if (!booking) {
        return res.status(404).json({ message: 'Agendamento não encontrado' });
      }

      booking.status = 'Agendado';
      await booking.save();

      return res.json({ message: 'Agendamento aprovado com sucesso', booking });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao aprovar agendamento' });
    }
  },

  // ❌ Cancelar agendamento
  async cancelBooking(req, res) {
    try {
      const { id } = req.params;
      const booking = await Booking.findByPk(id);

      if (!booking) {
        return res.status(404).json({ message: 'Agendamento não encontrado' });
      }

      booking.status = 'Cancelado';
      await booking.save();

      return res.json({ message: 'Agendamento cancelado com sucesso', booking });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao cancelar agendamento' });
    }
  },
};

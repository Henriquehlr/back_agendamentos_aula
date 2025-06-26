const { Booking, User } = require('../models');
const registerLog = require('../utils/registerLog');

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

      const user = await User.findByPk(userId);

      await registerLog({
        name: user.name,
        activityType: "Criação de agendamento",
        module: "Agendamentos"
      });

      return res.status(201).json(booking);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao criar agendamento' });
    }
  },

  async listBookings(req, res) {
    try {
      const bookings = await Booking.findAll({ include: 'user' });
      return res.json(bookings);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao listar agendamentos' });
    }
  },

  async approveBooking(req, res) {
    try {
      const { id } = req.params;
      const booking = await Booking.findByPk(id, { include: 'user' });

      if (!booking) {
        return res.status(404).json({ message: 'Agendamento não encontrado' });
      }

      booking.status = 'Agendado';
      await booking.save();

      await registerLog({
        name: booking.user.name,
        activityType: "Aprovação de agendamento",
        module: "Agendamentos"
      });

      return res.json({ message: 'Agendamento aprovado com sucesso', booking });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao aprovar agendamento' });
    }
  },

  async cancelBooking(req, res) {
    try {
      const { id } = req.params;
      const booking = await Booking.findByPk(id, { include: 'user' });

      if (!booking) {
        return res.status(404).json({ message: 'Agendamento não encontrado' });
      }

      booking.status = 'Cancelado';
      await booking.save();

      await registerLog({
        name: booking.user.name,
        activityType: "Cancelamento de agendamento",
        module: "Agendamentos"
      });

      return res.json({ message: 'Agendamento cancelado com sucesso', booking });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao cancelar agendamento' });
    }
  },
};

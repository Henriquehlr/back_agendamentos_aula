const express = require('express');
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Rota para criar um novo agendamento
router.post('/', authMiddleware, bookingController.createBooking);

// Rota para listar todos os agendamentos
router.get('/', authMiddleware, bookingController.listBookings);

// Rota para aprovar um agendamento
router.patch('/:id/approve', authMiddleware, bookingController.approveBooking);

// Rota para cancelar um agendamento
router.patch('/:id/cancel', authMiddleware, bookingController.cancelBooking);

module.exports = router;

const express = require('express');
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, bookingController.createBooking);
router.get('/', authMiddleware, bookingController.listBookings);
router.patch('/:id/approve', authMiddleware, bookingController.approveBooking);
router.patch('/:id/cancel', authMiddleware, bookingController.cancelBooking);

module.exports = router;

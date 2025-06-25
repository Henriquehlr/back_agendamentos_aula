const express = require('express');
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware'); 

const router = express.Router();

router.post('/', authMiddleware, bookingController.createBooking);
router.get('/', authMiddleware, bookingController.listBookings);

module.exports = router;

const express = require('express');
const { getPrayerTimes } = require('../controllers/prayerController');
const router = express.Router();

router.get('/', getPrayerTimes);

module.exports = router;

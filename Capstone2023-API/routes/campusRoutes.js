// server/routes/campusRoutes.js
const express = require('express');
const router = express.Router();
const campusController = require('../controllers/campusController');

router.get('/campus', campusController.getCampus);
router.post('/campus', campusController.upsertCampus);
router.post('/campus/toggleGame', campusController.toggleGame);

module.exports = router;

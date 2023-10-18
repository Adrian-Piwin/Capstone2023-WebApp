// server/routes/campusRoutes.js
const express = require('express');
const router = express.Router();
const campusController = require('../controllers/campusController');

router.get('/campus', campusController.getCampusByLobbyID);
router.post('/campus', campusController.upsertCampusByLobbyID);

module.exports = router;

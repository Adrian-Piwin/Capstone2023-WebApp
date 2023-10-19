// routes/poiRoutes.js
const express = require('express');
const router = express.Router();
const poiController = require('../controllers/poiController');

// Login route
router.get('/poi/getAllPOI', poiController.getAllPOI);
router.post('/poi', poiController.upsertPOI);
router.delete('/poi', poiController.deletePOI);

module.exports = router;

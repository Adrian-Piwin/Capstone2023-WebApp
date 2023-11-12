// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Login route
router.post('/admin/sendPostCommand', adminController.sendPostCommand);
router.get('/admin/sendGetCommand', adminController.sendGetCommand);

module.exports = router;

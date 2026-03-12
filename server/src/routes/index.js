const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const assetRoutes = require('./assets');
const portfolioRoutes = require('./portfolio');

router.use('/auth', authRoutes);
router.use('/assets', assetRoutes);
router.use('/portfolio', portfolioRoutes);

module.exports = router;

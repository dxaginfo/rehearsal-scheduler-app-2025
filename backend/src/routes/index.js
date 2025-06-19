const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const bandRoutes = require('./band.routes');
const rehearsalRoutes = require('./rehearsal.routes');

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is running' });
});

// Mount route modules
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/bands', bandRoutes);
router.use('/rehearsals', rehearsalRoutes);

module.exports = router;
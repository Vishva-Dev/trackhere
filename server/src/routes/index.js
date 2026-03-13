import express from 'express';
const router = express.Router();

import authRoutes from './auth.js';
import expenseRoutes from './expenseRoutes.js';

router.use('/auth', authRoutes);
router.use('/expenses', expenseRoutes);

export default router;

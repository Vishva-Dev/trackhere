import jwt from 'jsonwebtoken';
import prisma from '../config/db.js';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('--- Auth Middleware Debug ---');
    console.log('Auth Header:', authHeader ? 'Present' : 'Missing');
    console.log('Token:', token ? 'Extracted' : 'Missing');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        
        // Verify user still exists in DB (important after resets)
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId }
        });

        if (!user) {
            console.warn(`Auth Warning: User ${decoded.userId} not found in database.`);
            return res.status(401).json({ error: 'User no longer exists. Please log in again.' });
        }

        req.userId = decoded.userId;
        console.log(`Auth Success: User ${req.userId} identified.`);
        next();
    } catch (error) {
        console.error('Auth middleware error:', error.message);
        res.status(401).json({ error: 'Invalid or expired token.' });
    }
};

export default authMiddleware;

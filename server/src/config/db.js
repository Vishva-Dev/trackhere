import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

let prisma;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient({
        log: ['error', 'warn'],
        datasources: {
            db: {
                url: process.env.DATABASE_URL
            }
        }
    });
} else {
    // In development, use a global variable so that the value
    // is preserved across module reloads caused by HMR.
    if (!globalThis.prisma) {
        globalThis.prisma = new PrismaClient({
            log: ['error', 'warn']
        });
    }
    prisma = globalThis.prisma;
}

export default prisma;

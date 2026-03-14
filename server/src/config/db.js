import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

let prisma;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    // In development, use a global variable so that the value
    // is preserved across module reloads caused by HMR.
    if (!globalThis.prisma) {
        globalThis.prisma = new PrismaClient();
    }
    prisma = globalThis.prisma;
}

export default prisma;

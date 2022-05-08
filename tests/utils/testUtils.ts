import { prisma } from "../../src/database.js";

export async function truncateRecommendations() {
    await prisma.$executeRaw`
        TRUNCATE TABLE
            recommendations    
    ;`;
}

export async function disconnectPrismas() {
    await prisma.$disconnect();
}
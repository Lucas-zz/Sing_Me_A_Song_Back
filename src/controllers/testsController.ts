import { Request, Response } from 'express';
import { prisma } from '../database.js';

async function resetDatabase(req: Request, res: Response) {
    await prisma.$executeRaw`
        TRUNCATE TABLE
            recommendations
    ;`;

    res.sendStatus(200);
}

async function seedRecommendations(req: Request, res: Response) {
    await prisma.recommendation.createMany({
        data: [
            { name: "The Trail - The Witcher 3 Trailer Music", youtubeLink: "https://www.youtube.com/watch?v=s3L0_ez0Dg4" },
            { name: "Toss A Coin to Your Witcher", youtubeLink: "https://www.youtube.com/watch?v=waMkFIzvDpE" },
            { name: "Netflix The Witcher - Full Original Soundtrack", youtubeLink: "https://www.youtube.com/watch?v=uv54ec8Pg1k" }
        ],
        skipDuplicates: true
    }
    );
    res.sendStatus(200);
}

const testsController = {
    resetDatabase,
    seedRecommendations
};

export default testsController;
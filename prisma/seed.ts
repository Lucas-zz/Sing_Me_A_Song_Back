import { prisma } from "../src/database.js";

async function seed() {
    await prisma.recommendation.createMany({
        data: [
            { name: "The Trail - The Witcher 3 Trailer Music", youtubeLink: "https://www.youtube.com/watch?v=s3L0_ez0Dg4" },
            { name: "Toss A Coin to Your Witcher", youtubeLink: "https://www.youtube.com/watch?v=waMkFIzvDpE" },
            { name: "Netflix The Witcher - Full Original Soundtrack", youtubeLink: "https://www.youtube.com/watch?v=uv54ec8Pg1k" }
        ]
    });
}

seed()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
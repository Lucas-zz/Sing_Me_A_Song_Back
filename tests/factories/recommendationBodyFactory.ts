import { faker } from '@faker-js/faker';
import { Recommendation } from '@prisma/client';

export function recommendationBodyFactory() {
    const recommendation = {
        name: "The Song Of the White Wolf - The Witcher 3",
        youtubeLink: "https://www.youtube.com/watch?v=E2bNdbAcQSI"
    };

    return recommendation;
}

export function manyRecommendationsBodyFactory() {
    const recommendations = [
        {
            name: "The Song Of the White Wolf - The Witcher 3",
            youtubeLink: "https://www.youtube.com/watch?v=E2bNdbAcQSI",
            score: faker.datatype.number(500)
        },
        {
            name: "Commanding The Fury - The Witcher 3",
            youtubeLink: "https://www.youtube.com/watch?v=trxSGpAA31Q",
            score: faker.datatype.number(500)
        },
        {
            name: "The Trail - The Witcher 3 Trailer Music",
            youtubeLink: "https://www.youtube.com/watch?v=s3L0_ez0Dg4",
            score: faker.datatype.number(500)
        },
        {
            name: "Toss A Coin to Your Witcher",
            youtubeLink: "https://www.youtube.com/watch?v=waMkFIzvDpE",
            score: faker.datatype.number(500)
        },
        {
            name: "Netflix The Witcher - Full Original Soundtrack",
            youtubeLink: "https://www.youtube.com/watch?v=uv54ec8Pg1k",
            score: faker.datatype.number(500)
        }
    ]

    return recommendations;
}

export function recommendationDataFactory(): Recommendation {
    return {
        id: 1,
        name: faker.name.findName(),
        youtubeLink: faker.internet.url(),
        score: -5
    };
}

export function nthRecommendationsBodyFactory(number: number) {
    const recommendations = [];

    for (let i = 0; i < number; i++) {
        recommendations.push({
            name: faker.name.findName(),
            youtubeLink: faker.internet.url()
        });
    }

    return recommendations;
}
import { prisma } from "../../src/database.js";
import { CreateRecommendationData } from "../../src/services/recommendationsService.js";
import { manyRecommendationsBodyFactory, nthRecommendationsBodyFactory, recommendationBodyFactory } from "./recommendationBodyFactory.js";

export async function recommendationFactory() {
    const data: CreateRecommendationData = recommendationBodyFactory();

    return await prisma.recommendation.create({
        data
    });
}

export async function manyRecommendationsFactory() {
    const data = manyRecommendationsBodyFactory();

    await prisma.recommendation.createMany({
        data,
        skipDuplicates: true
    });
}

export async function nthRecommendationsFactory(number: number) {
    const data = nthRecommendationsBodyFactory(number);

    await prisma.recommendation.createMany({
        data,
        skipDuplicates: true
    });
}
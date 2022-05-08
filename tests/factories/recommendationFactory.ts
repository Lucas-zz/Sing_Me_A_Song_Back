import { prisma } from "../../src/database.js";
import { Recommendation } from "@prisma/client";
import { CreateRecommendationData } from "../../src/services/recommendationsService.js";

export const recommendationFactory: CreateRecommendationData = {
    name: "Commanding The Fury - The Witcher 3",
    youtubeLink: "https://www.youtube.com/watch?v=trxSGpAA31Q"
};

export const recommendationIntegrationFactory: CreateRecommendationData = {
    name: "The Song Of the White Wolf - The Witcher 3",
    youtubeLink: "https://www.youtube.com/watch?v=E2bNdbAcQSI"
};

export async function findRecommendationDatabaseSeed(id: number): Promise<Recommendation> {
    return await prisma.recommendation.findUnique({ where: { id } });
}
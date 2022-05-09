
import { jest } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService";
import { recommendationDataFactory } from "../factories/recommendationBodyFactory";
import * as errorUtils from "../../src/utils/errorUtils";
import * as testUtils from "../utils/testUtils";

describe("Unit Tests - Recommendation Services", () => {
    beforeEach(testUtils.resetTests);

    describe("INSERT - RecommendationService", () => {
        it("should throw error if no recommendation is found", async () => {
            const recommendation = recommendationDataFactory();

            jest.spyOn(recommendationRepository, "findByName").mockResolvedValue({ ...recommendation });
            jest.spyOn(recommendationRepository, "create").mockResolvedValue();

            expect(async () => {
                await recommendationService.insert(recommendation);
            }).rejects.toEqual(errorUtils.conflictError);
        });
    });

    describe("UPVOTE - RecommendationService", () => {
        it("should throw error if no recommendation is found", async () => {
            jest.spyOn(recommendationRepository, "find").mockReturnValue(null);

            expect(async () => {
                await recommendationService.upvote(1);
            }).rejects.toEqual(errorUtils.notFoundError);
        });
    });

    describe("DOWNVOTE - RecommendationService", () => {
        it("should delete recommendation if its downvote score is lower than -5", async () => {
            const recommendation = recommendationDataFactory();

            jest.spyOn(recommendationRepository, "find").mockResolvedValue(recommendation);
            jest.spyOn(recommendationRepository, "updateScore").mockResolvedValue({ ...recommendation, score: -6 });

            const remove = jest
                .spyOn(recommendationRepository, "remove")
                .mockResolvedValue(null);

            await recommendationService.downvote(1);

            expect(remove).toHaveBeenCalledTimes(1);
        });

        it("should throw error if no recommendation is found", async () => {
            jest.spyOn(recommendationRepository, "find").mockReturnValue(null);

            expect(async () => {
                await recommendationService.downvote(1);
            }).rejects.toEqual(errorUtils.notFoundError);
        });
    });

    describe("GetByScore - RecommendationService", () => {
        it("should return recommendations", async () => {
            const recommendation = recommendationDataFactory();
            jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([recommendation]);

            const result = await recommendationService.getByScore("gt");

            expect(result).toEqual([recommendation]);
        });

        it("should findAll if filtered return no recommendations", async () => {
            jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([]);

            const result = jest
                .spyOn(recommendationRepository, "findAll")
                .mockResolvedValue([]);

            await recommendationService.getByScore("gt");

            expect(result).toHaveBeenCalledTimes(2);
        });

        it("should findAll filtered with valid scoreFilter GT", async () => {
            const result = jest
                .spyOn(recommendationRepository, "findAll")
                .mockResolvedValue([]);

            await recommendationService.getByScore("gt");

            expect(result).toBeCalledWith({ score: 10, scoreFilter: "gt" });
        });

        it("should findAll filtered with valid scoreFilter lte", async () => {
            const result = jest
                .spyOn(recommendationRepository, "findAll")
                .mockResolvedValue([]);

            await recommendationService.getByScore("lte");

            expect(result).toBeCalledWith({ score: 10, scoreFilter: "lte" });
        });

        it("should throw erro if no recommendation is found", async () => {
            jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([]);

            expect(async () => {
                await recommendationService.getRandom();
            }).rejects.toEqual(errorUtils.notFoundError);
        });
    });

    describe("GetScoreFilter - RecommendationService", () => {
        it("should return lte if value is higher than 0.7", async () => {
            const result = recommendationService.getScoreFilter(0.71);

            expect(result).toBe("lte");
        });

        it("should return gt if value is lower than 0.7", async () => {
            const result = recommendationService.getScoreFilter(0.69);

            expect(result).toBe("gt");
        });
    });

    describe("RANDOM - RecommendationService", () => {
        it("should throw error if no recommendation is found", async () => {
            jest.spyOn(recommendationService, "getScoreFilter").mockReturnValue("gt");
            jest.spyOn(recommendationService, "getByScore").mockResolvedValue([]);
            jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([]);

            expect(async () => {
                await recommendationService.getRandom();
            }).rejects.toEqual(errorUtils.notFoundError);
        });
    });
});
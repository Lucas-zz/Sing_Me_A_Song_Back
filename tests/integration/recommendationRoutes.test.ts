import { prisma } from "../../src/database.js";
import supertest from "supertest";
import app from "../../src/app.js";
import { faker } from '@faker-js/faker';
import { recommendationBodyFactory } from "../factories/recommendationBodyFactory.js";
import { manyRecommendationsFactory, recommendationFactory } from "../factories/recommendationFactory.js";
import * as testUtils from "../utils/testUtils.js";

const ENDPOINT = "/recommendations"

describe("Integration Tests - Recommendation Routes", () => {
    beforeEach(testUtils.truncateRecommendations);
    afterAll(testUtils.disconnectPrismas);

    describe("POST - /recommendations", () => {
        it("returns 201 given a valid body", async () => {
            const body = recommendationBodyFactory();

            const { status } = await supertest(app).post(`${ENDPOINT}`).send(body);

            expect(status).toEqual(201);
        });

        it("returns 409 given a repeated body", async () => {
            const body = recommendationBodyFactory();

            await supertest(app).post(`${ENDPOINT}`).send(body);
            const { status } = await supertest(app).post(`${ENDPOINT}`).send(body);

            expect(status).toEqual(409);
        });
    });

    describe("POST - /recommendations/:id/upvote", () => {
        it("returns 200 given a successful upvote", async () => {
            const vote = "upvote";

            const recommendation = await recommendationFactory();

            const { score: oldScore } = await prisma.recommendation.findUnique({
                where: {
                    id: recommendation.id
                }
            });

            const { status } = await supertest(app).post(`${ENDPOINT}/${recommendation.id}/${vote}`);

            const { score: newScore } = await prisma.recommendation.findUnique({
                where: {
                    id: recommendation.id
                }
            });

            expect(status).toEqual(200);
            expect(newScore > oldScore).toBe(true);
        });
    });

    describe("POST - /recommendations/:id/downvote", () => {
        it("returns 200 given a successful downvote", async () => {
            const vote = "downvote";

            const recommendation = await recommendationFactory();

            const { score: oldScore } = await prisma.recommendation.findUnique({
                where: {
                    id: recommendation.id
                }
            });

            const { status } = await supertest(app).post(`${ENDPOINT}/${recommendation.id}/${vote}`);

            const { score: newScore } = await prisma.recommendation.findUnique({
                where: {
                    id: recommendation.id
                }
            });

            expect(status).toEqual(200);
            expect(newScore < oldScore).toBe(true);
        });
    });

    describe("GET - /recommendations", () => {
        it("returns 200 and an object with recommendations", async () => {
            await recommendationFactory();

            const { status, body } = await supertest(app).get(`/recommendations`);

            expect(status).toEqual(200);
            expect(body.length > 0).toBe(true);
        });
    });

    describe("GET - /recommendations/random", () => {
        it("returns 200 and an object with random recommendations", async () => {
            await manyRecommendationsFactory();

            const { status, body } = await supertest(app).get(`${ENDPOINT}/random`);

            expect(status).toEqual(200);
            expect(typeof body).toBe("object");
        });
    });

    describe("GET - /recommendations/top/:amount", () => {
        it("returns 200 given the amount of top recommendations", async () => {
            await manyRecommendationsFactory();

            const QUANTITY_OF_SONGS = faker.datatype.number({ min: 3, max: 5 });

            const { status, body } = await supertest(app).get(`${ENDPOINT}/top/${QUANTITY_OF_SONGS}`);

            expect(status).toEqual(200);
            expect(body.length === QUANTITY_OF_SONGS).toBe(true);
        });
    });

    describe("GET - /recommendations/:id", () => {
        it("returns 200 given a valid id", async () => {
            const { id: ID } = await recommendationFactory();

            const { status, body } = await supertest(app).get(`${ENDPOINT}/${ID}`);

            expect(status).toEqual(200);
            expect(typeof body).toBe("object");
        });

        it("returns 200 given an invalid id", async () => {
            const ID = 99999;

            const { status, body } = await supertest(app).get(`${ENDPOINT}/${ID}`);

            expect(status).toEqual(404);
            expect(body).toEqual({});
        });
    });

});
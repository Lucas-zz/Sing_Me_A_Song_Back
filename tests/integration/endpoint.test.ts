import supertest from "supertest";
import app from "../../src/app.js";
import { findRecommendationDatabaseSeed, recommendationIntegrationFactory } from "../factories/recommendationFactory.js";
import * as testUtils from "../utils/testUtils.js";

const ENDPOINT = "/recommendations"

describe("Recommendations", () => {

    afterAll(testUtils.disconnectPrismas);

    describe("GET - /recommendations", () => {
        it("returns 200 and an object with recommendations", async () => {
            const { status, body } = await supertest(app).get(`/recommendations`);

            expect(status).toEqual(200);
            expect(body.length > 0).toBe(true);
        });
    });

    describe("GET - /recommendations/random", () => {
        it("returns 200 and an object with random recommendations", async () => {
            const { status, body } = await supertest(app).get(`${ENDPOINT}/random`);

            expect(status).toEqual(200);
            expect(typeof body).toBe("object");
        });
    });

    describe("GET - /recommendations/top/:amount", () => {
        it("returns 200 given the amount of top recommendations", async () => {
            const QUANTITY_OF_SONGS = 3;

            const { status, body } = await supertest(app).get(`${ENDPOINT}/top/${QUANTITY_OF_SONGS}`);

            expect(status).toEqual(200);
            expect(body.length === 3).toBe(true);
        });
    });

    describe("GET - /recommendations/:id", () => {
        it("returns 200 given a valid id", async () => {
            const ID = 1;

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

    describe("POST - /recommendations", () => {
        it("returns 201 given a valid body", async () => {
            const { status } = await supertest(app).post(`${ENDPOINT}`).send(recommendationIntegrationFactory);

            expect(status).toEqual(201);
        });

        it("returns 409 given a repeated body", async () => {
            const { status } = await supertest(app).post(`${ENDPOINT}`).send(recommendationIntegrationFactory);

            expect(status).toEqual(409);
        });
    });

    describe("POST - /recommendations/:id/upvote", () => {
        it("returns 200 given a successful upvote", async () => {
            const vote = "upvote";

            const { newScore, oldScore, status } = await upOrDownVote(vote);

            expect(newScore > oldScore).toBe(true);
            expect(status).toEqual(200);
        });
    });

    describe("POST - /recommendations/:id/downvote", () => {
        it("returns 200 given a successful downvote", async () => {
            const vote = "downvote";

            const { newScore, oldScore, status } = await upOrDownVote(vote);

            expect(newScore < oldScore).toBe(true);
            expect(status).toEqual(200);
        });
    });
});

async function upOrDownVote(vote: String) {
    const SEED_DATABASE_RECOMMENDATION_ID = 1;

    const { id, score: oldScore } = await findRecommendationDatabaseSeed(SEED_DATABASE_RECOMMENDATION_ID);
    const { status } = await supertest(app).post(`${ENDPOINT}/${id}/${vote}`);
    const { score: newScore } = await findRecommendationDatabaseSeed(SEED_DATABASE_RECOMMENDATION_ID);

    return { newScore, oldScore, status }
}
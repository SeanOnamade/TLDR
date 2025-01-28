/**
 * 
 * Necessary Packages:
 * - supertest: for automated HTTP requests to test endpoints
 * - https: to simulate an HTTPS server
 * - fs: for reading SSL certificates
 * - app: the server instance exported from index.js
 */
const TEST_REQUESTS = require('supertest');
const https = require('https');
const fs = require('fs');
const app = require('../index');

/**
 * SSL configuration for the test server
 */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const HTTPS_SYS_ENVS = {
    key: process.env.SSL_KEY,
    cert: process.env.SSL_CERT,
};

/**
 * 
 * @define: Test suite initialization
 * 
 * Tests for:
 * - /preProcess route (valid and invalid JSON requests)
 * - /train route (valid and invalid JSON requests)
 * - /filter route (valid and invalid JSON requests)
 * - /prod route (valid and invalid JSON requests)
 */
describe('DemoDay1 Tests', () => {

    let server;

    // Initialize the HTTPS server before running tests
    beforeAll(() => {
        server = https.createServer(HTTPS_SYS_ENVS, app).listen(7050);
    });

    // Close the HTTPS server after running tests
    afterAll(() => {
        server.close();
    });

    /**
     * @define: DemoDay1_Test1 -> Testing /preProcess route
     * 
     * @Test1a: Valid JSON
     *          1) Sends valid JSON to /preProcess
     *          2) Expects HTTP status code 200
     *          3) Checks the response body for correct message and data
     */
    test('POST /preProcess with valid JSON', async () => {
        const res = await TEST_REQUESTS(server)
            .post('/preProcess')
            .send({ key: 'value' })
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('process up');
        expect(res.body.data).toEqual({ key: 'value' });
    });

    /**
     * @Test1b: Invalid JSON
     *          1) Sends improperly formatted JSON to /preProcess
     *          2) Expects HTTP status code 200
     *          3) Checks if server handles errors gracefully
     */
    test('POST /preProcess with invalid JSON', async () => {
        const res = await TEST_REQUESTS(server)
            .post('/preProcess')
            .send('Invalid JSON String')
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(400); // Assuming server responds with 400 for invalid JSON
    });

    /**
     * @define: DemoDay1_Test2 -> Testing /train route
     * 
     * @Test2a: Valid JSON
     *          1) Sends valid JSON to /train
     *          2) Expects HTTP status code 200
     *          3) Checks the response body for correct message and data
     */
    test('POST /train with valid JSON', async () => {
        const res = await TEST_REQUESTS(server)
            .post('/train')
            .send({ trainingData: [1, 2, 3] })
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('train route receive: ');
        expect(res.body.data).toEqual({ trainingData: [1, 2, 3] });
    });

    /**
     * @Test2b: Invalid JSON
     *          1) Sends improperly formatted JSON to /train
     *          2) Expects HTTP status code 400 or relevant error
     */
    test('POST /train with invalid JSON', async () => {
        const res = await TEST_REQUESTS(server)
            .post('/train')
            .send('Invalid JSON')
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(400); // Assuming server responds with 400 for invalid JSON
    });

    /**
     * @define: DemoDay1_Test3 -> Testing /filter route
     * 
     * @Test3a: Valid JSON
     *          1) Sends valid JSON to /filter
     *          2) Expects HTTP status code 200
     *          3) Checks the response body for correct message and data
     */
    test('POST /filter with valid JSON', async () => {
        const res = await TEST_REQUESTS(server)
            .post('/filter')
            .send({ filterKey: 'value' })
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('train route receive: ');
        expect(res.body.data).toEqual({ filterKey: 'value' });
    });

    /**
     * @Test3b: Invalid JSON
     *          1) Sends improperly formatted JSON to /filter
     *          2) Expects HTTP status code 400 or relevant error
     */
    test('POST /filter with invalid JSON', async () => {
        const res = await TEST_REQUESTS(server)
            .post('/filter')
            .send('Invalid JSON')
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(400);
    });

    /**
     * @define: DemoDay1_Test4 -> Testing /prod route
     * 
     * @Test4a: Valid JSON
     *          1) Sends valid JSON to /prod
     *          2) Expects HTTP status code 200
     *          3) Checks the response body for correct message and data
     */
    test('POST /prod with valid JSON', async () => {
        const res = await TEST_REQUESTS(server)
            .post('/prod')
            .send({ prodKey: 'value' })
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('train route receive: ');
        expect(res.body.data).toEqual({ prodKey: 'value' });
    });

    /**
     * @Test4b: Invalid JSON
     *          1) Sends improperly formatted JSON to /prod
     *          2) Expects HTTP status code 400 or relevant error
     */
    test('POST /prod with invalid JSON', async () => {
        const res = await TEST_REQUESTS(server)
            .post('/prod')
            .send('Invalid JSON')
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(400);
    });
});

/**
 * 
 * Necessary Packages:
 * - supertest: for automated HTTP requests to test endpoints
 * - https: to simulate an HTTPS server
 * - fs: for reading SSL certificates
 * - app: the server instance exported from index.js ---
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
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem')
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
    let connections = new Set();

    beforeAll(() => {
        return new Promise((resolve) => {
            server = https.createServer(HTTPS_SYS_ENVS, app)
                .listen(7051, () => {
                    console.log('Test server started on port 7051');
                    resolve();
                });

            // Track all connections
            server.on('connection', (connection) => {
                connections.add(connection);
                connection.on('close', () => connections.delete(connection));
            });
        });
    });

    afterAll(() => {
        return new Promise((resolve) => {
            // Close all tracked connections
            connections.forEach((connection) => connection.destroy());
            connections.clear();

            if (server && server.listening) {
                server.close(() => {
                    console.log('Test server closed');
                    resolve();
                });
            } else {
                resolve();
            }
        });
    });

    /**
     * @define: DemoDay1_Test1 -> Testing /preProcess route
     */
    test('POST /preProcess with valid JSON', async () => {
        const res = await TEST_REQUESTS(server)
            .post('/preProcess')
            .send({ key: 'value' })
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error');
    });

    test('POST /preProcess with invalid JSON', async () => {
        const res = await TEST_REQUESTS(server)
            .post('/preProcess')
            .send('Invalid JSON String')
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(400);
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

    test('POST /train with invalid JSON', async () => {
        const res = await TEST_REQUESTS(server)
            .post('/train')
            .send('Invalid JSON')
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(400);
    });

    /**
     * @define: DemoDay1_Test3 -> Testing /filter route
     */
    test('POST /filter with valid JSON', async () => {
        const res = await TEST_REQUESTS(server)
            .post('/filter')
            .send({ filterKey: 'value' })
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('filter route receive: ');
        expect(res.body.data).toEqual({ filterKey: 'value' });
    });

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
        expect(res.body.message).toBe('prod route receive: ');
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

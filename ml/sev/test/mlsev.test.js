/**
 * 
 * Necessary Packages:
 * - disable the cert verification because I am self-certificated for HTTPS
 * - supertest: for automated tests
 * - https: for interacting with the spun HTTPS server
 * - fs: for file system referencing
 * - app funciton calling server instance
 */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const TEST_REQUESTs = require('supertest');
const https = require('https');
const FILE_SYSTEM_LOCAL = require('fs');
const SEV_ISNTANCE = require('../index');

require('dotenv').config({path: '../.env'});
const HTTPS_SYS_ENVS = {
    key: process.env.SSL_KEY,
    cert: process.env.SSL_CERT,
}

/**
 * 
 * @define: Test suite initialization
 * 
 * @DemoDay1_Test1 -> POST /preProcess with valid JSON
 *        -> POST /preProcess with non-valid JSON (improper formatting)  
 *        -> GET /preProcess checking to see if valid JSON thrown
 * 
 * @DemoDay1_Test2 -> POST /training with valid JSON
 *        -> POST /training with non-valid JSON (improper formatting)  
 *        -> GET /training checking to see if valid JSON thrown
 * 
 * @DemoDay_Test3 -> POST /filter with valid JSON
 *        -> POST /filter with non-valid JSON (improper formatting) 
 *        -> Checking to see if this server can correctly filter data to train/prod 
 *        -> GET /filter checking to see if valid JSON thrown
 * 
 * @DemoDay_Test4 -> POST /prod with valid JSON
 *        -> POST /prod with non-valid JSON (improper formatting) 
 *        -> Checking to see if this server can correctly filter data to train/prod 
 *        -> GET /prod checking to see if valid JSON thrown
 */
describe('DemoDay1 Tests', () => {

    // This allows for pre-initalization, and closing of the server for cleanup
    let sev;
    beforeAll(() => {
        sev = https.createServer(HTTPS_SYS_ENVS, SEV_ISNTANCE).listen(7050);
    });
    afterAll(() => {
        sev.close();
    });

    /**
     * 
     * @define: DemoDay1_Test1 -> checking validity of /preProcess
     * 
     * @Test1a valid JSON
     *          1) assert status code 200
     *          2) assert JSON body = 'process up'
     *          3) assert values are equal for JSON key
     * 
     */
    test('POST /preProcess with valid JSON', async () => {
        let res = await TEST_REQUESTs(sev)
            .post('/preProcess')
            .send({key: 'value'})
            .set('Content-Type', 'application/json');

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe('process up');
            expect(res.body.data).toEqual({key: 'value'});
    });



});
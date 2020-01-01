'use strict'

const routeHandlers = require('./handlers/route-handlers');

module.exports = function(fastify, options, done) {

    // Get all banks
    fastify.get('/', async (request, reply) => {

        // Prepare query to pass to the handler
        let query = {
            sql: 'SELECT * FROM Bank;'
        };

        // Get response data from the handler
        let [responseCode, headers, response] = await routeHandlers.getAllHandler(fastify.mysql, fastify.log, query);

        // Send response
        reply
            .code(responseCode)
            .headers(headers)
            .send(response);
    });

    // Get specific bank
    fastify.get('/:bankId', async (request, reply) => {

        // Get the bankId from the URL
        let bankId = request.params.bankId;
        
        // Prepare query to pass to the handler
        let query = {
            sql: `
                SELECT * 
                FROM Bank 
                WHERE bankId = ?;`,
            values: [bankId]
        };

        // Get response data from the handler
        let [responseCode, headers, response] = await routeHandlers.getOneHandler(fastify.mysql, fastify.log, query);

        // Send response
        reply
            .code(responseCode)
            .headers(headers)
            .send(response);
    });

    // Add new bank
    fastify.post('/', async (request, reply) => {

        // Get the properties of the object from the body of the request
        let bank        = request.body;
        let routeURL    = request.raw.url;

        // Prepare query to pass to the handler
        let query = {
            sql: `
                INSERT INTO Bank 
                SET bankName = ?;`,
            values: [bank.bankName]
        };

        // Get response data from the handler
        let [responseCode, headers, response] = await routeHandlers.postHandler(fastify.mysql, fastify.log, query, routeURL);

        // Send response
        reply
            .code(responseCode)
            .headers(headers)
            .send(response);
    });

    // Update specific bank
    fastify.put('/:bankId', async (request, reply) => {

        // Get the bankId from the URL
        // Get updated bank information from the request body
        let bankId      = request.params.bankId;
        let updatedBank = request.body;

        // Prepare query to pass to the handler
        let query = { 
            sql: `
                UPDATE Bank
                SET bankName = ?
                WHERE bankId = ?;`,
            values: [
                updatedBank.bankName,
                bankId
            ]
        };

        // Get response data from the handler
        let [responseCode, headers, response] = await routeHandlers.putHandler(fastify.mysql, fastify.log, query);

        // Send response
        reply
            .code(responseCode)
            .headers(headers)
            .send(response);
    });

    // Delete specific bank
    fastify.delete('/:bankId', async (request, reply) => {

        // Get the bankId from the URL
        let bankId = request.params.bankId;

        let query = { 
            sql: `
                DELETE FROM Bank 
                WHERE bankId = ?;`,
            values: [bankId]
        };

        // Get response data from the handler
        let [responseCode, headers, response] = await routeHandlers.deleteHandler(fastify.mysql, fastify.log, query);

        // Send response
        reply
            .code(responseCode)
            .headers(headers)
            .send(response);
    });

    done();
}
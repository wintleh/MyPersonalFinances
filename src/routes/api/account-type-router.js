'use strict'

const routeHandlers = require('./handlers/route-handlers');

module.exports = function(fastify, options, done) {

    // Get all bank account types
    fastify.get('/', async (request, reply) => {

        // Prepare query to pass to the handler
        let query = {
            sql: 'SELECT * FROM AccountType;'
        };

        // Get response data from the handler
        let [responseCode, headers, response] = await routeHandlers.getAllHandler(fastify.mysql, fastify.log, query);

        // Send response
        reply
            .code(responseCode)
            .headers(headers)
            .send(response);
    });

    // Get specific bank account type
    fastify.get('/:accountTypeId', async (request, reply) => {

        // Get the accountTypeId from the URL
        let accountTypeId = request.params.accountTypeId;
        
        // Prepare query to pass to the handler
        let query = {
            sql: `
                SELECT * 
                FROM AccountType 
                WHERE accountTypeId = ?;`,
            values: [accountTypeId]
        };

        // Get response data from the handler
        let [responseCode, headers, response] = await routeHandlers.getOneHandler(fastify.mysql, fastify.log, query);

        // Send response
        reply
            .code(responseCode)
            .headers(headers)
            .send(response);
    });

    // Add new bank account type
    fastify.post('/', async (request, reply) => {

        // Get the properties of the object from the body of the request
        let accountType = request.body;
        let routeURL    = request.raw.url;

        // Prepare query to pass to the handler
        let query = {
            sql: `
                INSERT INTO AccountType 
                SET typeName = ?;`,
            values: [accountType.typeName]
        };

        // Get response data from the handler
        let [responseCode, headers, response] = await routeHandlers.postHandler(fastify.mysql, fastify.log, query, routeURL);

        // Send response
        reply
            .code(responseCode)
            .headers(headers)
            .send(response);
    });

    // Update specific bank account type
    fastify.put('/:accountTypeId', async (request, reply) => {

        // Get the accountTypeId from the URL
        // Get updated bank account type information from the request body
        let accountTypeId = request.params.accountTypeId;
        let updatedAccountType = request.body;

        // Prepare query to pass to the handler
        let query = { 
            sql: `
                UPDATE AccountType 
                SET typeName = ?
                WHERE accountTypeId = ?;`,
            values: [
                updatedAccountType.typeName,
                accountTypeId
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

    // Delete specific bank account type
    fastify.delete('/:accountTypeId', async (request, reply) => {

        // Get the accountTypeId from the URL
        let accountTypeId = request.params.accountTypeId;

        let query = { 
            sql: `
                DELETE FROM AccountType 
                WHERE accountTypeId = ?;`,
            values: [accountTypeId]
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
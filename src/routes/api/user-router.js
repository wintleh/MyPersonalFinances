'use strict'

const routeHandlers = require('./handlers/route-handlers');

module.exports = function(fastify, options, done) {

    // Get specific user account
    fastify.get('/:userAccountId', async (request, reply) => {

        // Get the userAccountId from the URL
        let userAccountId = request.params.userAccountId;
        
        // Prepare query to pass to the handler
        let query = {
            sql: `
                SELECT * 
                FROM UserAccount 
                WHERE userAccountId = ?;`,
            values: [userAccountId]
        };

        // Get response data from the handler
        let [responseCode, headers, response] = await routeHandlers.getOneHandler(fastify.mysql, fastify.log, query);

        // Send response
        reply
            .code(responseCode)
            .headers(headers)
            .send(response);
    });

    // Add new user account
    fastify.post('/', async (request, reply) => {

        // Get the properties of the object from the body of the request
        let userAccount = request.body;
        let routeURL    = request.raw.url;

        // Prepare query to pass to the handler
        let query = {
            sql: `
                INSERT INTO UserAccount 
                SET username = ?,
                    firstName = ?,
                    lastName = ?;`,
            values: [
                userAccount.username,
                userAccount.firstName,
                userAccount.lastName
            ]
        };

        // Get response data from the handler
        let [responseCode, headers, response] = await routeHandlers.postHandler(fastify.mysql, fastify.log, query, routeURL);

        // Send response
        reply
            .code(responseCode)
            .headers(headers)
            .send(response);
    });

    // Update specific user account
    fastify.put('/:userAccountId', async (request, reply) => {

        // Get the userAccountId from the URL
        // Get updated bank information from the request body
        let userAccountId   = request.params.userAccountId;
        let updatedBank     = request.body;

        // Prepare query to pass to the handler
        let query = { 
            sql: `
                UPDATE UserAccount 
                SET username = ?,
                    firstName = ?,
                    lastName = ?
                WHERE userAccountId = ?;`,
            values: [
                updatedBank.username,
                updatedBank.firstName,
                updatedBank.lastName,
                userAccountId
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

    // Delete specific user account
    fastify.delete('/:userAccountId', async (request, reply) => {

        // Get the userAccountId from the URL
        let userAccountId = request.params.userAccountId;

        let query = { 
            sql: `
                DELETE FROM UserAccount 
                WHERE userAccountId = ?;`,
            values: [userAccountId]
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
'use strict'

const routeHandlers = require('./handlers/route-handlers');

module.exports = function(fastify, options, done) {

    // Get all transaction categories
    fastify.get('/', async (request, reply) => {

        // Prepare query to pass to the handler
        let query = {
            sql: 'SELECT * FROM TransactionCategory;'
        };

        // Get response data from the handler
        let [responseCode, headers, response] = await routeHandlers.getAllHandler(fastify.mysql, fastify.log, query);

        // Send response
        reply
            .code(responseCode)
            .headers(headers)
            .send(response);
    });

    // Get specific transaction category
    fastify.get('/:transactionCategoryId', async (request, reply) => {

        // Get the transactionCategoryId from the URL
        let transactionCategoryId = request.params.transactionCategoryId;
        
        // Prepare query to pass to the handler
        let query = {
            sql: `
                SELECT * 
                FROM TransactionCategory 
                WHERE transactionCategoryId = ?;`,
            values: [transactionCategoryId]
        };

        // Get response data from the handler
        let [responseCode, headers, response] = await routeHandlers.getOneHandler(fastify.mysql, fastify.log, query);

        // Send response
        reply
            .code(responseCode)
            .headers(headers)
            .send(response);
    });

    // Add new transaction category
    fastify.post('/', async (request, reply) => {

        // Get the properties of the object from the body of the request
        let transactionCategory = request.body;
        let routeURL            = request.raw.url;

        // Prepare query to pass to the handler
        let query = {
            sql: `
                INSERT INTO TransactionCategory 
                SET categoryName = ?;`,
            values: [transactionCategory.categoryName]
        };

        // Get response data from the handler
        let [responseCode, headers, response] = await routeHandlers.postHandler(fastify.mysql, fastify.log, query, routeURL);

        // Send response
        reply
            .code(responseCode)
            .headers(headers)
            .send(response);
    });

    // Update specific transaction category
    fastify.put('/:transactionCategoryId', async (request, reply) => {

        // Get the transactionCategoryId from the URL
        // Get updated transaction category information from the request body
        let transactionCategoryId       = request.params.bankId;
        let updatedTransactionCategory  = request.body;

        // Prepare query to pass to the handler
        let query = { 
            sql: `
                UPDATE TransactionCategory 
                SET categoryName = ?
                WHERE transactionCategoryId = ?;`,
            values: [
                updatedTransactionCategory.categoryName,
                transactionCategoryId
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

    // Delete specific transaction category
    fastify.delete('/:transactionCategoryId', async (request, reply) => {

        // Get the transactionCategoryId from the URL
        let transactionCategoryId = request.params.transactionCategoryId;

        let query = { 
            sql: `
                DELETE FROM TransactionCategory 
                WHERE transactionCategoryId = ?;`,
            values: [transactionCategoryId]
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
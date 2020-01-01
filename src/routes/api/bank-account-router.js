'use strict'

const routeHandlers = require('./handlers/route-handlers');

module.exports = function(fastify, options, done) {

    // Get all bank accounts
    fastify.get('/', async (request, reply) => {

        // Prepare query to pass to the handler
        let query = {
            sql: 'SELECT * FROM BankAccount;'
        };

        // Get response data from the handler
        let [responseCode, headers, response] = await routeHandlers.getAllHandler(fastify.mysql, fastify.log, query);

        // Send response
        reply
            .code(responseCode)
            .headers(headers)
            .send(response);
    });

    // Get specific bank account
    fastify.get('/:bankAccountId', async (request, reply) => {

        // Get the bankAccountId from the URL
        let bankAccountId = request.params.bankAccountId;
        
        // Prepare query to pass to the handler
        let query = {
            sql: `
                SELECT * 
                FROM BankAccount 
                WHERE bankAccountId = ?;`,
            values: [bankAccountId]
        };

        // Get response data from the handler
        let [responseCode, headers, response] = await routeHandlers.getOneHandler(fastify.mysql, fastify.log, query);

        // Send response
        reply
            .code(responseCode)
            .headers(headers)
            .send(response);
    });

    // Add new bank account
    fastify.post('/', async (request, reply) => {

        // Get the properties of the object from the body of the request
        let bankAccount = request.body;
        let routeURL    = request.raw.url;

        // Prepare query to pass to the handler
        let query = {
            sql: `
                INSERT INTO BankAccount 
                SET accountName = ?, 
                    balance = ?, 
                    accountTypeId = ?, 
                    bankId = ?, 
                    userAccountId = ?;`,
            values: [
                bankAccount.accountName, 
                bankAccount.balance, 
                bankAccount.accountTypeId, 
                bankAccount.bankId, 
                bankAccount.userAccountId
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

    // Update specific bank account
    fastify.put('/:bankAccountId', async (request, reply) => {

        // Get the bankAccountId from the URL
        // Get updated bank account information from the request body
        let bankAccountId       = request.params.bankAccountId;
        let updatedBankAccount  = request.body;

        // Prepare query to pass to the handler
        let query = { 
            sql: `
                UPDATE BankAccount 
                SET accountName     = ?, 
                    balance         = ?, 
                    accountTypeId   = ?, 
                    bankId          = ?,
                    userAccountId   = ?
                WHERE bankAccountId = ?;`,
            values: [
                updatedBankAccount.accountName, 
                updatedBankAccount.balance, 
                updatedBankAccount.accountTypeId, 
                updatedBankAccount.bankId, 
                updatedBankAccount.userAccountId,
                bankAccountId
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

    // Delete specific bank account
    fastify.delete('/:bankAccountId', async (request, reply) => {

        // Get the bankAccountId from the URL
        let bankAccountId = request.params.bankAccountId;

        let query = { 
            sql: `
                DELETE FROM BankAccount 
                WHERE bankAccountId = ?;`,
            values: [bankAccountId]
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
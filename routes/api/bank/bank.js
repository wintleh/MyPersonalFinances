'use strict'

// Import schemas
const schemas = require('./schema');

// Import handlers
const handlers = require('./handler');

module.exports = function(fastify, options, done) {

    // Gets all banks
    fastify.get('/', handlers.getBanks);

    // Gets specific bank
    fastify.get('/:bankId', handlers.getBank);

    // Adds new bank
    fastify.post('/', handlers.createBank);

    // Updates bank
    fastify.put('/:bankId', handlers.updateBank);

    // Deletes bank
    fastify.delete('/:bankId', handlers.deleteBank);

    done();
}
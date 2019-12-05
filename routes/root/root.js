'use strict'

module.exports = function(fastify, options, done) {
    fastify.get('/', (request, reply) => {
        // Serve static HTML page from here
        // This will be a single page design
        reply.send({ hello: 'world' });
    });

    done();
}
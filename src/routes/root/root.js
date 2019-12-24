'use strict'

module.exports = function(fastify, options, done) {
    fastify.get('/', (request, reply) => {
        
        // Send index.html file
        reply.sendFile('./html/index.html');
    });

    done();
}
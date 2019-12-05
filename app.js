'use strict'

const fastify = require('fastify')({
    ignoreTrailingSlash: true,
    logger: true
})

// Register routes
fastify.register(require('./routes/root/root'));
fastify.register(require('./routes/api/bank/bank'), { prefix: '/api/bank'});

// Start server
fastify.listen(3000, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }

    fastify.log.info(`Server listening on ${ address }`);
});
'use strict'

const path = require('path');

// Read environment variables
const env = require('./src/env/env');

const fastify = require('fastify')({
    ignoreTrailingSlash: true,
    logger: true
});

// Fastify extension to serve static files
fastify.register(require('fastify-static'), {
    root: path.join(__dirname, '/src/static')
});

// Register routes
fastify.register(require('./src/routes/root/root'));
fastify.register(require('./src/routes/api/bank/bank'), { prefix: '/api/bank'}); // UPDATE

// Get the host and port from environment vars
const serverOptions = {
    host: env.HOST,
    port: env.PORT
};

// Start server, get port
fastify.listen(serverOptions, (err, address) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }

    fastify.log.info(`Server listening on ${ address }`);
});

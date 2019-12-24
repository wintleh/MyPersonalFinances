'use strict'

const path = require('path');

// Read environment variables
const env = require('./src/env/env');

// Initialize fastify instance
const fastify = require('fastify')({
    ignoreTrailingSlash: true,
    logger: true
});



// Register mysql middleware
// Fastify extension to serve static files
fastify.register(require('fastify-static'), {
    root: path.join(__dirname, '/src/static')
});

// Fastify extension to connect with MySQL database
fastify.register(require('fastify-mysql'), {
    connectionString:   `mysql://${env.DBUSER}:${env.DBPASS}@${env.DBHOST}/${env.DBNAME}`,
    promise:            true
});

// Register routes
fastify.register(require('./src/routes/root/root'));
fastify.register(require('./src/routes/api/bank/router'), { prefix: '/api/bank' });




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

'use strict'

// Server error response
const serverError = {
    error: `Server Error`
}

module.exports = function(fastify, options, done) {

    // Get all banks
    fastify.get('/', (request, reply) => {
    
        fastify.mysql.query( {
            sql: 'SELECT * FROM bank;'
        }, (error, results, fields) => {
                
            // Handle query error
            if (error) {
                
                // Log error
                fastify.log.error(error);

                // Indicate server error
                reply
                    .code(500)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(serverError);
            }

            let banks = [];
            
            // Iterate over all results
            results.forEach(row => {
                
                // Create new bank object
                let bank = {
                    bankId: row.bankId,
                    bankName: row.bankName
                };
    
                // Add bank object to the banks array
                banks.push(bank);
            });

            // Return success response
            reply
                .code(200)
                .header('Content-Type', 'application/json; charset=utf-8')
                .send(banks);
        });
    });

    // Get specific bank
    fastify.get('/:bankId', (request, reply) => {

        // Get the bankId from the URL
        let bankId = request.params.bankId;
    
        fastify.mysql.query( { 
            sql: 'SELECT * FROM bank WHERE bankId = ?;',
            values: [bankId]
        }, (error, results, fields) => {

            // Handle query error
            if (error) {
                
                // Log error
                fastify.log.error(error);

                // Indicate server error
                reply
                    .code(500)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(serverError);
            }

            // Requested bank not found
            if (results.length === 0) {

                // Not found response
                reply
                    .code(404)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send();
            }
            // Requested bank found
            else if (results.length === 1) {

                // Send requested bank
                reply
                    .code(200)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(results);
            }
            // Multiple banks found with given ID
            else {

                // Log the error
                let errorMessage = `Multiple banks found with id ${bankId}`;
                fastify.log.error(errorMessage.error);

                // Send server error response
                reply
                    .code(500)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(serverError);
            }
        });
    });

    // Add new bank
    fastify.post('/', (request, reply) => {

        // Get the bank name from body of request
        let bankName = request.body.bankName;

        fastify.mysql.query( { 
            sql: 'INSERT INTO Bank SET bankName = ?;',
            values: [bankName]
        }, (error, results, fields) => {

            // Handle query error
            if (error) {
                
                // Log error
                fastify.log.error(error);

                // Indicate server error
                reply
                    .code(500)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(serverError);
            }

            // No rows updated
            if (results.affectedRows === 0) {

                // Indicate server error
                reply
                    .code(404)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send();
            } 
            // Only one row updated
            else if (results.affectedRows === 1) {

                // Create bank object with the bankId returned by the query
                let newBank = {
                    bankId:     results.insertId,
                    bankName:   bankName
                }

                // Send successful response with the newly added object
                reply
                    .code(201)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(newBank);
            }
            // 2+ rows updated (2+ banks added), Indicates error
            else {
                
                // Log the error
                let errorMessage = `${results.affectedRows} rows were created`;
                fastify.log.error(errorMessage.error);

                // Send server error response
                reply
                    .code(500)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(serverError);
            }
        });
    });

    // Update specific bank
    fastify.put('/:bankId', (request, reply) => {

        // Get the bankId from the URL
        // Get new bank name from body of request
        let bankId = request.params.bankId;
        let newBankName = request.body.bankName;
    
        fastify.mysql.query( { 
            sql: 'UPDATE bank SET bankName = ? WHERE bankId = ?;',
            values: [newBankName, bankId]
        }, (error, results, fields) => {

            // Handle query error
            if (error) {

                // Log error
                fastify.log.error(error);

                // Indicate server error
                reply
                    .code(500)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(serverError);
            }

            // No rows updated
            if (results.affectedRows === 0) {

                // Specified resource could not be found to be updated
                reply
                    .code(404)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send();
            }
            // Only one row updated
            else if (results.affectedRows === 1) {

                // Specified bank was updated
                reply
                    .code(204)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send();
            }
            // 2+ rows updated, Indicates error
            else {

                // Log the error
                let errorMessage = `Multiple banks updated with id ${bankId}`;
                fastify.log.error(errorMessage);

                // Send server error response
                reply
                    .code(500)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(serverError);
            }
        });
    });

    // Delete specific bank
    fastify.delete('/:bankId', (request, reply) => {

        // Get the bankId from the URL
        let bankId = request.params.bankId;

        fastify.mysql.query( { 
            sql: 'DELETE FROM bank WHERE bankId = ?;',
            values: [bankId]
        }, (error, results, fields) => {

            // Handle query error
            if (error) {

                // Log error
                fastify.log.error(error);

                // Indicate server error
                reply
                    .code(500)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(serverError);
            }

            // No rows updated
            if (results.affectedRows === 0) {

                // Could not find resource to be deleted
                reply
                    .code(404)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send();
            }
            // Only one row updated
            else if (results.affectedRows === 1) {

                // Specified bank was deleted
                reply
                    .code(204)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send();
            }
            // 2+ rows updated, Indicates error
            else {

                // Log the error
                let errorMessage = `Multiple banks deleted with id ${bankId}`;
                fastify.log.error(errorMessage);

                // Send server error response
                reply
                    .code(500)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send(serverError);
            }
        });
    });

    done();
}
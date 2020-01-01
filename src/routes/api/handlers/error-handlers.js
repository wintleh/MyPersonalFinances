'use strict'

const serverError = () => {
    return [500, { error: 'Internal Server Error' }];
}

const logErrorMsg = (errorMsg, query) => {

    // Log the error
    let error = {
        err: errorMsg,
        query: query
    };

    return error;
}

module.exports = { 

    // Server error response
    serverError: {
        error: `Server Error`
    },

    // Server error
    serverError: (fastify, reply, error) => {

        // Log error
        fastify.log.error(error);
    
        // Indicate server error
        reply
            .code(500)
            .header('Content-Type', 'application/json; charset=utf-8')
            .send(serverError);
    },

    // Above to be removed w/ refactoring


    multipleObjectsCreatedError: (logger, query) => {

        // Set server response error
        let [responseCode, response] = serverError();

        // Log error message and query that caused error
        logger.error(logErrorMsg(`Multiple objects created`, query));

        return [responseCode, response];
    },

    noObjectsCreatedError: (logger, query) => {

        // Set server response error
        let [responseCode, response] = serverError();

        // Log error message and query that caused error
        logger.error(logErrorMsg(`Object not created`, query));

        return [responseCode, response];
    },

    multipleObjectsReturnedError: (logger, query) => {

        // Set server response error
        let [responseCode, response] = serverError();

        // Log error message and query that caused error
        logger.error(logErrorMsg(`Multiple objects found with id ${query.values[0]}`, query));

        return [responseCode, response];
    },

    serverErrorHandler: (logger, error) => {

        // Log the error
        logger.error(error);

        return serverError();;
    },

    getErrorHandler: (logger, error) => {
        
        // User denied from select queries on the table
        if (error.code === 'ER_TABLEACCESS_DENIED_ERROR') {

            // Log the error
            logger.error({
                error: 'User denied access from table',
                msg: error.msg
            });
        }
        // Catch all other errors
        else {

            // Log the error
            logger.error(error);
        }

        return serverError();;
    },

    // TODO Refactor
    // Delete request error handler
    deleteErrorHandler: (logger, error) => {

        let responseCode    = null;
        let response        = null;

        // There is an object referencing this object
        // Not allowed to delete a dependent row in the database
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            
            responseCode = 409;
            response = {
                error: `Unable to delete: Another object is referencing this object`
            };
        }
        else {
            
            // Set server response error
            responseCode    = 500;
            response        = serverError;

            // Log the error
            logger.error(error);
        }

        return [responseCode, response];
    }
};
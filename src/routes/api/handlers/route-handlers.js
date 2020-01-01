'use strict'

const errorHandlers = require('./error-handlers');

/* TODO 

    Test error handlers
    Pass fastify.log in functions? (from routers)

*/

const defaultHeaders = () => {
    return {
        'Content-Type': 'application/json; charset=utf-8'
    };
}

// HTTP Response file?
const ok = (response) => {
    return [200, response];
}

const created = (url) => {

    // Add a location to the default header
    let headers         = defaultHeaders();
    headers.Location    = url;

    return [201, headers,'Created'];
}

const notFound = () => {
    return [404, 'Not Found'];
}

const noContent = () => {
    return [204, ''];
}

module.exports = {

    getAllHandler: async (database, logger, query) => {

        let responseCode    = null;
        let headers         = defaultHeaders();
        let response        = null;

        try {

            // Query database for all objects in table
            const [result, fields] = await database.query(query);

            // Set the response to the array of queried objects
            [responseCode, response] = ok(result);
        }
        catch (error) {

            [responseCode, response] = errorHandlers.getErrorHandler(logger, error);
        }

        return [responseCode, headers, response];
    },

    getOneHandler: async (database, logger, query) => {

        let responseCode    = null;
        let headers         = defaultHeaders();
        let response        = null;

        try {

            // Query database for a single object
            const [result, fields] = await database.query(query);

            // No objects found
            if (result.length === 0) {

                // Not found response
                [responseCode, response] = notFound();
            }

            // More than one object found for given id
            else if (result.length > 1) {

                // Send a server error
                [responseCode, response] = errorHandlers.multipleObjectsReturnedError(logger, query);
            }
            
            // Single account found for given id
            else {

                // Set the response to the array of queried objects
                [responseCode, response] = ok(result);
            }
        }
        catch (error) {

            [responseCode, response] = errorHandlers.getErrorHandler(logger, error);
        }

        return [responseCode, headers, response];
    },

    postHandler: async (database, logger, query, routeURL) => {

        let responseCode    = null;
        let headers         = defaultHeaders();
        let response        = null;

        try {

            // Add object to database
            const [result, fields] = await database.query(query);

            // Object was not created
            if (result.affectedRows === 0) {
                
                // Send a server error, no objects created
                [responseCode, response] = errorHandlers.noObjectsCreatedError(logger, query);
            }

            // Multiple object created
            else if (result.affectedRows > 1) {
                
                // Send a server error
                [responseCode, response] = errorHandlers.multipleObjectsCreatedError(logger, query);
            }

            // Success
            else {

                // Get the url of the new resource
                let url = `${routeURL}/${result.insertId}`;

                // Set a 201 Created response w/ location of resource in the header
                [responseCode, headers, response] = created(url);
            }
        }
        catch (error) {

            errorHandlers.serverErrorHandler(logger, error);
        }

        return [responseCode, headers, response];
    },

    putHandler: async(database, logger, query) => {

        let responseCode    = null;
        let headers         = defaultHeaders();
        let response        = null;

        try {

            // Update the object, get the response from the database
            const [result, fields] = await database.query(query);

            // No objects found
            if (result.length === 0) {

                // Not found response
                [responseCode, response] = notFound();
            }

            // More than one object found for given id
            else if (result.length > 1) {

                // Send a server error, multiple objects returned
                [responseCode, response] = errorHandlers.multipleObjectsReturnedError(logger, query);
            }

            // Success
            else {
                
                // No content response
                [responseCode, response] = noContent();
            }
        }
        catch (error) {

            errorHandlers.serverErrorHandler(logger, error);
        }

        return [responseCode, headers, response];
    },

    deleteHandler: async (database, logger, query) => {

        let responseCode    = null;
        let headers         = defaultHeaders();
        let response        = null;

        try {

            // Update the bank account type, get the response from the database
            const result = await database.query(query);

            // No account types found with given id
            if (result.affectedRows === 0) {

                // Not found response
                [responseCode, response] = notFound();
            }

            // Multiple account types found with given id
            else if (result.affectedRows > 1) {

                // Send a server error, multiple objects returned
                [responseCode, response] = errorHandlers.multipleObjectsReturnedError(logger, query);
            }

            // Success
            else {
                
                // No content response
                [responseCode, response] = noContent();
            }
        }
        catch (error) {

            [responseCode, response] = errorHandlers.deleteErrorHandler(logger, error);
        }

        return [responseCode, headers, response];
    }
}
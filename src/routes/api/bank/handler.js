'use strict'

const bankStorage = require('../../../storage/bankStorage');

const getBanks = (request, reply) => {

    // Fetch banks from storage
    let results = bankStorage.fetchBanks();

    // Return success response
    reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(results);
}

const getBank = (request, reply) => {

    // Gets the bankId from the URL
    let bankId = request.params.bankId;

    // By default assume that there was an error
    // Update code and response if the bank is found
    let responseCode    = 404;
    let response        = {
        error: `bankId(${bankId}) not found`
    }

    // Search for specified bank in storage
    let bank = bankStorage.fetchBank(bankId);

    // If non-empty object returned, then search was successful
    // Update the responseCode for successful search
    if (bank !== null) {
        responseCode    = 200;
        response        = bank;
    }

    // Send response
    reply
        .code(responseCode)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(response);
}

const createBank = (request, reply) => {
 
    // By default assume that there was an error
    // Update this code based on the success of creating object
    let responseCode = 500;

    // Get the bank name from the body of the post request
    let bankName = request.body.bankName;

    // Attempt to add bank to storage
    let added = bankStorage.addBank(bankName);

    // Change code if addition was successful
    if (added) {
        responseCode = 201;
    }

    // Send response
    reply
        .code(responseCode)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(bankStorage.fetchBanks());
}

const updateBank = (request, reply) => {
    reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ 
            message: 'updateBank not implemented', 
            bankId: request.params.bankId 
        });
}

const deleteBank = (request, reply) => {
    reply
        .code(200)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send({ 
            message: 'deleteBank not implemented', 
            bankId: request.params.bankId 
        });
}

module.exports = { getBanks, getBank, createBank, updateBank, deleteBank };
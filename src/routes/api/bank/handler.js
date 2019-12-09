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

    // Get the bankId from the URL
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
    if (bank) {
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
    // Update code and response based on the success of creating object
    let responseCode    = 500;
    let response        = {
        error: 'Bank not created'
    }

    // Get the bank name from body of request
    let bankName = request.body.bankName;

    // Attempt to add bank to storage
    let added = bankStorage.addBank(bankName);

    // Change code if addition was successful
    if (added) {
        responseCode    = 201;
        response        = bankStorage.fetchBanks();
    }

    // Send response
    reply
        .code(responseCode)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(response);
}

const updateBank = (request, reply) => {

    // Get the bankId from the URL
    // Get new bank name from body of request
    let bankId = request.params.bankId;
    let newBankName = request.body.bankName;

    // By default assume that there was an error
    // Update code and response if the bank is found
    let responseCode    = 404;
    let response        = {
        error: `bankId(${bankId}) not found`
    }

    // Search for specified bank in storage
    let updated = bankStorage.updateBank(bankId, newBankName);

    // If update was successful
    // Update the responseCode for successful search
    if (updated) {
        responseCode    = 200;
        response        = bankStorage.fetchBanks();
    }

    // Send response
    reply
        .code(responseCode)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(response);
}

const deleteBank = (request, reply) => {

    // Get the bankId from the URL
    let bankId = request.params.bankId;

    // By default assume that there was an error
    // Update code and response if the bank is found
    let responseCode    = 404;
    let response        = {
        error: `bankId(${bankId}) not found`
    }

    // Attempt to delete specified bank from storage
    let deleted = bankStorage.deleteBank(bankId);

    // If delete was successful
    // Update the responseCode and response message for successful delete
    if (deleted) {
        responseCode    = 200;
        response        = 'Successfully deleted bank';
    }

    // Send response
    reply
        .code(responseCode)
        .header('Content-Type', 'application/json; charset=utf-8')
        .send(response);
}

module.exports = { getBanks, getBank, createBank, updateBank, deleteBank };
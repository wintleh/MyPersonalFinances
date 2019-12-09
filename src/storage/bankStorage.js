'use strict'

let count = 0;
let banks = [];

/**
 * Private helper function. 
 * Search for bank with bankId "id". 
 * 
 * @param {number} id Id of bank to search for
 * @return { { bank: { bankId: number, bankName: string}, index: number } | null } Location object if found, null if not found
 */
const search = (id) => {

    // Start with bank not found state
    let response = null;
    let index = 0;

    let length = banks.length;

    // Iterate over all banks
    for(index; index < length; index++ ) {
        
        let currentBank = banks[index];

        // If the ids match, update 'bank' with 'currentBank'
        if (currentBank.bankId === id) {
            response = { 
                bank: currentBank,
                index: index
            };
            break;
        }
    }

    return response;
}

/**
 * Private helper function. 
 * Checks if "bankName" is in storage. 
 * 
 * @param {string} bankName Name of bank to search for
 * @return {boolean} True if unique, False if not
 */
const isUniqueName = (bankName) => {

    for (let index = 0; index < banks.length; index++) {
        // If bankName matches a name of another bank
        // Then name is not unique
        if (banks[index].bankName === bankName) {
            return false;
        }
    }
    return true;
}



/**
 * Fetch all the banks from storage.
 * 
 * @return { [{ bankId: number, bankName: string}] } Array of bank objects in storage
 */
const fetchBanks = () => {
    // Return copy of banks array
    return banks.slice();
}

/**
 * Fetch a bank with bankId "bankId". 
 * 
 * @param {number} bankId Unique ID for object to be returned
 * @return { { bankId: number, bankName: string} | null } Bank object if found, null if not found
 */
const fetchBank = (bankId) => {

    // Cast string to integer
    bankId = parseInt(bankId);
    
    // Search for bank with given id
    let location = search(bankId);

    // If found, return the bank object
    if (location) {
        return location.bank;
    }

    // If not found return null
    return null;
}

/**
 * Adds a new bank object with "bankName" as the name of the object. 
 * bankName must be unique.
 * 
 * @param {string} bankName Unique string for the name of the bank
 * @return {boolean} Indicates success of adding bank (true: successful, false: unsuccessful)
 */
const addBank = (bankName) => {

    // If bankName is not unique
    // Then the new bank cannot be created, return false
    if(!isUniqueName(bankName)) {
        return false;
    }

    // Create new bank object
    let newBank = {
        bankId: count,
        bankName: bankName
    };

    // Add new bank object to array
    banks.push(newBank);

    // Increase counter; temp UID
    count++;

    // bankName was unique, and there were no errors
    return true;
}

/**
 * Updates bankName for bank with bankId "bankId". 
 * bankName must be unique. 
 * 
 * @param {number} bankId Unique ID for object to be updated
 * @param {string} newBankName Unique string for the name of the bank
 * @return {boolean} True bank updated successfully, False bank not updated
 */
const updateBank = (bankId, newBankName) => {

    // If bankName is not unique
    // Then the new bank cannot be created, return false
    if(!isUniqueName(newBankName)) {
        return false;
    }

    // Cast string to integer
    bankId = parseInt(bankId);
    
    // Search for bank with given id
    let location = search(bankId);

    // If a bank was found
    if (location) {

        // Update bankName, return true
        banks[location.index].bankName = newBankName;

        return true;
    }
    
    // Bank not found
    return false;
}

/**
 * Deletes bank object given by "bankId". 
 * 
 * @param {number} bankId Unique ID for object to be deleted
 * @return {boolean} True if deleted successfully, False if not deleted
 */
const deleteBank = (bankId) => {
    
    // Cast string to integer
    bankId = parseInt(bankId);
    
    // Search for bank with given id
    let location = search(bankId);

    // If a bank was found
    if (location) {

        // Remove from the array, return true
        banks.splice(location.index, 1);
        return true;
    }
    
    // Bank not found
    return false;
}

module.exports = { fetchBanks, fetchBank, addBank, updateBank, deleteBank };
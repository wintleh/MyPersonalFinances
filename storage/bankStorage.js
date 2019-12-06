'use strict'

let count = 0;
let banks = [];

/**
 * Private helper function. 
 * Search for bank with bankId 'id'. 
 * 
 * @param {number} id Id of bank to search for
 * @return { { bankId: number, bankName: string} | null } Bank object if found, null if not found
 */
const search = (id) => {

    // Start with bank not found state
    let bank = null;

    let length = banks.length;

    // Iterate over all banks
    for(let index = 0; index < length; index++ ) {
        
        let currentBank = banks[index];

        // If the ids match, update 'bank' with 'currentBank'
        if (currentBank.bankId === id) {
            bank = currentBank;
            break;
        }
    }

    return bank;
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
 * Fetch a bank with bankId 'bankId'
 * 
 * @param {number} bankId Unique ID for object to be returned
 * @return { { bankId: number, bankName: string} | null } Bank object if found, null if not found
 */
const fetchBank = (bankId) => {

    // Cast string to integer
    bankId = parseInt(bankId);
    
    // Search for bank with given id
    let bank = search(bankId);

    return bank;
}

/**
 * Adds a new bank object with 'bankName' as the name of the object.
 * 
 * @param {string} bankName Unique string for the name of the bank
 * @return {boolean} Indicates success of adding bank (true: successful, false: unsuccessful)
 */
const addBank = (bankName) => {

    // Create new bank object
    let newBank = {
        bankId: count,
        bankName: bankName
    };

    // Add new bank object to array
    banks.push(newBank);

    // Increase counter; temp UID
    count++;

    return true;
}

module.exports = { fetchBanks, fetchBank, addBank };
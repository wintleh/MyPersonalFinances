'use strict'

const getBanks = {
    response: {
        200: {
            type: 'array',
            items: {
                _id: {type: 'number'},
                name: {type: 'string'}
            }
        }
    }
}

const getBank = {

}

module.exports = { getBanks, getBank };
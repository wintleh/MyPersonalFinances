'use strict'

const getBanks = (request, reply) => {
    reply.send({ message: 'getBanks not implemented' });
}

const getBank = (request, reply) => {
    // request.param
    reply.send({ message: 'getBank not implemented' });
}

const createBank = (request, reply) => {
    reply.send({ message: 'createBank not implemented' });
}

const updateBank = (request, reply) => {
    reply.send({ message: 'updateBank not implemented' });
}

const deleteBank = (request, reply) => {
    reply.send({ message: 'deleteBank not implemented' });
}

module.exports = { getBanks, getBank, createBank, updateBank, deleteBank };
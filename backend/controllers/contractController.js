const Contract = require('../models/Contract')

const getContracts = async (req, res) => {
    try {
        const contracts = await Contract.find({}).sort({createdAt: -1})
        res.status(200).json(contracts)
    } catch (error) {
        res.status(400).json({error: 'can not get contracts'})
    }
}

const newContract = async (req, res) => {
    try {
        await Contract.create(req.body)
        res.status(200).json({message: 'New Contract created successfully'})
    } catch (error) {
        res.status(400).json({error: 'somthing went wrong'})
    }
}

const deleteContract = async (req, res) => {
    try {
        const contract = await Contract.findOneAndDelete({ _id: req.params.id })
        if (!contract) {
            throw Error("no such contract")
        }
        res.json({message: 'deleted successfully', contract})
    } catch (error) {
        res.status(400).json({error: 'somthing went wrong'})
    }
}

module.exports = {
    getContracts,
    newContract,
    deleteContract
}
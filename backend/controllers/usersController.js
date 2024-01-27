const Token = require('../models/Token')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, {})
}

const getUsers = async (req, res) => {
    try {
        const data = await User.find({})
        const users = data.filter(u => u.username !== 'System Administrator')
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json({ error: 'something went wrong' })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)

        const token = createToken(user._id)
        res.status(200).json({ userId: user._id, email, username: user.username, token })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


const signupUser = async (req, res) => {
    const { username, email, password } = req.body

    try {
        await User.signup(username, email, password)

        // const token = createToken(user._id)
        res.status(201).json({ mess: 'An email sent to your account please verify' })

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
}

const verifyUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        if (!user) {
            return res.status(400).json({ message: 'invalid link' });
        }

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        })
        if (!token) {
            return res.status(400).json({ message: 'invalid link' });
        }
        await User.updateOne({ _id: user._id }, { verified: true })
        // await token.remove()

        res.status(200).json({ message: 'Email verified successfully' })
    } catch (error) {
        res.status(500).json({ error: 'aaab Internal Server Error', err: error })
    }
}

const updateUser = async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.params.id })
        await User.updateOne({ _id: user._id }, { ...req.body })
        
        res.status(200).json({message: 'updated successfully'})
        
    } catch (error) {
        console.log(error);
        res.status(400).json({error: "can't update this user"})
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id })
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: "error"})
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id })
        res.status(200).json({message: 'deleted successfully', user})
    } catch (error) {
        res.status(400).json({error: "error"})
    }
}

module.exports = { getUsers, loginUser, signupUser, verifyUser, updateUser, getUser, deleteUser }
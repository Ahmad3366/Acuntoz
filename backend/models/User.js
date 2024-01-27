const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Token = require('./Token')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')

const Schema = mongoose.Schema

const userSchema = new Schema({
    // username: {
    //     type: String,
    //     default: '',
    //     unique: true
    // },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: String,
        default: ''
    },
    businessName: {
        type: String,
        required: true
    },
    businessEmail: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

// static signup method
userSchema.statics.signup = async function (businessName, businessEmail ,firstName, lastName, email, password) {

    if (!businessName || !businessEmail || !firstName || !lastName || !email || !password) {
        throw Error('all fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('email is not valid')
    }
    if (!validator.isEmail(businessEmail)) {
        throw Error('business email is not valid')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('password not strong enough')
    }
    if (password.length < 7) {
        throw Error('too short password')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use !')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({businessEmail, businessName, firstName, lastName, email, password: hash })

    const token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString('hex')
    }).save()
    const url = `${process.env.BASE_URL}/api/user/${user._id}/verify/${token.token}`
    
    await sendEmail(user.email, 'verify email', url)

    // return user
}

// static login method
userSchema.statics.login = async function(email, password) {
    
    if (!email || !password) {
        throw Error('all fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('incorrect password')
    }

    if (!user.verified) {
        let token = await Token.findOne({userId: user._id})
        if (!token) {
            const token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString('hex')
            }).save()
            const url = `${process.env.BASE_URL}api/user/${user._id}/verify/${token.token}`
            await sendEmail(user.email, 'verify email', url)
        }
        throw Error('An email sent to your account please verify')
    }

    return user    
}

module.exports = mongoose.model('User', userSchema)
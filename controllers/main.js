const jwt = require('jsonwebtoken')
const { BadRequest } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const login = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        throw new BadRequest('Please provide email and password')
    }

    const id = new Date().getDate()

    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })
    res.status(StatusCodes.OK).json({ msg: 'user created', token })
}

const dashboard = (req, res) => {
    
    const luckyNumber = Math.floor(Math.random() * 100)
    res
        .status(StatusCodes.OK)
        .json({
            msg: `Hello ${req.user.username}`,
            secret: `Your lucky Number is ${luckyNumber}`
        })
}

module.exports = {
    login,
    dashboard
}
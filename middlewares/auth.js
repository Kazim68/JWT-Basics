const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../../starter/errors')

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('No token provided')
    }

    const token = authHeader.split(' ')[1]

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        const { id, username } = decode
        req.user = { id, username }
        next()
    }
    catch (err) {
        throw new UnauthenticatedError('User not authorized to access this route')
    }
}

module.exports = {
    authMiddleware  
}
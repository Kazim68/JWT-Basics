const express = require('express')
const { authMiddleware } = require('../middlewares/auth')
const { login, dashboard } = require('../controllers/main')

const router = express.Router()

router.route('/login').post(login)
router.route('/dashboard').get(authMiddleware, dashboard)

module.exports = router
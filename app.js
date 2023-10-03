require('dotenv').config()
require('express-async-wrapper')
const express = require('express')
const mainRouter = require('./routes/main')
const notFound  = require('./middlewares/notFound')
const errorHandlerMiddleware = require('./middlewares/error-handler')

const app = express()

// middlewares
app.use(express.json())

app.use(express.static('./public'))

// routes

app.use('/api/v1', mainRouter)

app.use(notFound)
app.use(errorHandlerMiddleware)

// server

const port = process.env.PORT || 3000

const start = async () => {
    try {
        app.listen(port, () => console.log(`Server is listening on port ${port}`))
    }
    catch (err) {
        console.log(err)
    }
}

start()
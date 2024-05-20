const express = require('express')
const cors = require('cors')

const app = express()
const port = 3000

const bodyParser = require('body-parser')

const createServer = async () => {
    app.use(bodyParser.json())

    // routes
    await require(`./src/routes/api`)(app);

    app.listen(port, () => {
        console.log(`App listening at : ${port}`)
    })
    app.use(cors({
        origin: process.env.FRONTEND_ENDPOINT,
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary HTTP methods
        allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
        credentials: true // Allow sending cookies or authentication headers
    }));
};

module.exports = {
    createServer,
};
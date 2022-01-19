require('dotenv').config() // Connect variebles
const PORT = process.env.PORT || 5000
const express = require('express') //Plug in express
const cors = require('cors')
const fileUpload = require('express-fileupload')
const app = express()
const sequelize = require('./db') //Connect the database with Sequelize //The tables
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

app.use(cors()) //The working with the requests
app.use(express.json()) //The working with .json
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router) 
app.use(errorHandler)//Error handling

const start = async () => {
    try {
        await sequelize.authenticate() //The database connect
        await sequelize.sync() //The revise of database's state
        app.listen(PORT, () => console.log(`The server started on a port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()

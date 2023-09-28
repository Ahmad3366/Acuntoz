require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

const userRouter = require('./routes/userRouter')
const contractRouter = require('./routes/contractRouter')
const companyRouter = require('./routes/companyRouter')

// Middlewares
app.use(bodyParser.urlencoded({limit: '4mb', extended: true}))
app.use(bodyParser.json({limit: '4mb'}))
app.use(cors({
    origin: '*'
}))

// routes 
app.use('/api/user', userRouter)
app.use('/api/contracts', contractRouter)
app.use('/api/companies', companyRouter)

// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`listening on port ${process.env.PORT} and connected to db`);
    })
})
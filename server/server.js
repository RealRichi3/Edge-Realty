const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const {asyncWrapper} = require("./middlewares/asyncWrapper")
const {connectToDB} = require('./db/connectDB')
const {errorHandler} = require('./middlewares/errorHandler')
const {BASICAUTH, AGENTAUTH} = require('./middlewares/auth')


const config = process.env
const app = express()

app.use(cors())
app.use(express.json())

app.use(morgan('dev'))

// Access-Control-Allow-Origin
app.use((req, res, next) => {
    const allowed_origins = []
    const origin = req.header.origin;

    if (allowed_origins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);

    next()
})


// Routes 
const authRoute = require('./routes/authRoutes'),
    cartRoute = require('./routes/cartRoutes'),
    propertyRoute = require('./routes/propertyRoutes'),
    adminRoute = require('./routes/adminRoutes')

app.use('/api/auth', authRoute)
app.use('/api/auth/property',  propertyRoute)
app.use('/api/auth/cart', BASICAUTH, cartRoute)
app.use('/api/auth/admin', BASICAUTH, adminRoute)
app.use(errorHandler)

async function start(){
    try {
        // connerct to database
        await connectToDB(config.MONGO_URI)

        // express server init
        const PORT = config.PORT || 3343
        app.listen(PORT, ()=> {
            console.log(`Server currently listening on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()





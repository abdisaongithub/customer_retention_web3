const express = require('express')
const cors = require('cors')
const path = require('path')
const rate_limiter = require('express-rate-limit')
const formData = require('express-form-data')
const dotenv = require('dotenv')
const swaggerDoc = require("./swaggerDoc.json")
const swaggerUi = require("swagger-ui-express")

dotenv.config()

const limiter = rate_limiter({
    windowMs: 90000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
})

const app = express()

app.use(express.static(path.join(__dirname, "./storage")));
app.use(express.static(path.join(__dirname, "./public")));

const options = {
    uploadDir: process.cwd() + '/storage/temp',
    autoClean: false
}


app.use(formData.parse(options))
app.use(formData.format())
app.use(formData.union())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(cors())
app.use(limiter)

app.get('/', (req, res) => res.send('API Running'))

app.use('/api/auth', require('./routes/api/auth'))

app.use('/api/users', require('./routes/api/users'))
app.use('/api/roles', require('./routes/api/roles'))
app.use('/api/campaigns', require('./routes/api/campaigns'))
app.use('/api/tasks', require('./routes/api/tasks'))
app.use('/api/notifications', require('./routes/api/notifications'))
app.use('/api/participatingcampaigns', require('./routes/api/participatingcampaigns'))


app.get("*", (req, res) => {
    res.status(404).send('Route not found')
});

// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const PORT = process.env.PORT || 5000

app.listen(5000, () => console.log(`Express Server Started on port ${PORT} :)`))
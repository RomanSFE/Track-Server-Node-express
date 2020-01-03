require('./models/User')
require('./models/Track')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middlewares/requireAuth')


const app = express()
app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)


const mongoUri = 'mongodb+srv://roman:roman500500@cluster0-b0s2y.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})

mongoose.connection.on('connected', () =>{
    console.log('connected to the mongodb server')
})
mongoose.connection.on('error', err =>{
    console.error('Error connection to mongo db server', err)
})

app.get('/', requireAuth, (req, res) =>{
    res.send(`your emailis: ${req.user.email}`)
})
app.listen(3000, ()=>{
    console.log('Listening from 3000')
})
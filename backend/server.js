require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const studentsRoutes = require('./routes/studentRoutes')

const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/students', studentsRoutes)

//db conn
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //requests
        app.listen(process.env.PORT, ()=> {
        console.log('connected to db | listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error);
    })

/* 
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app'})
})
*/

process.env
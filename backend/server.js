require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const taskRoute = require('./Routes/taskRoute')
const userRoute = require('./Routes/userRoute')

//Access the environment variables
const PORT = process.env.PORT
const DB_URL = process.env.DB_URL
const DB_NAME = process.env.DB_NAME


app.use(express.json())
app.use(cors())


app.use('/api/tasks', taskRoute)
app.use('/api/user', userRoute)




//Connect to the db
mongoose.connect(DB_URL+DB_NAME).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Node API app is running on port ${PORT}`);
  })
}).catch((error) => {
  console.log(error);
})


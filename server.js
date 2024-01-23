const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
require('dotenv').config()
require('./connect')
const recipeRoute = require('./Routes/routeRecipe')
const userRoute = require('./Routes/routeUser')

//json middleware
app.use(express.json())
//cookie middleware
app.use(cookieParser())

//starting server
app.listen(process.env.PORT, () => {
  console.log('Server is running on port', process.env.PORT)
})

//use router middleware
app.use('/recipes/', recipeRoute)
app.use('/', userRoute)

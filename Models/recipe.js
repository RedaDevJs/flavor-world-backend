const mongoose = require('mongoose')

const recipeschema = new mongoose.Schema({
  title: String,
  category: String,
  author: String,
  origin: String,
  ingredients: [String],
  steps: [String],
  image: String,
})

const RecipeModel = mongoose.model('Recipe', recipeschema)
module.exports = RecipeModel

import mongoose, { Schema } from 'mongoose';

const recipeSchema = new Schema({
  author: String,
  title: String,
  category:String,
  origin:String,
  ingredients:[{ type: String }],
  steps:[{ type: String }],
  picture: String
});

const recipeModel = mongoose.model('Recipe', recipeSchema);

export default recipeModel;

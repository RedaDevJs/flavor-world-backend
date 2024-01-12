const RecipeModel = require('../Models/recipe')
const upload = require('../MiddleWares/multerMiddleware')

//reading all the recipes

const readAll = async (req, res, next) => {
  try {
    const dataRecepies = await RecipeModel.find()
    return res.json({
      data: dataRecepies,
    })
  } catch (error) {
    return res.json({
      error: error.message,
    })
  }
}
//reading recipe by id
const readById = async (req, res, next) => {
  try {
    //get id
    const recipeId = req.params.id
    //verify that server got the id
    console.log('Received request with ID:', recipeId)
    const response = await RecipeModel.findById(recipeId)
    if (!response) {
      res.status(404).json({ error: 'Recipe not found' })
      return
    }

    res.json({ data: response })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred' })
  }
}

//reading a single recipe by title
const readByTitle = async (req, res, next) => {
  try {
    const { title } = req.query
    console.log('Received request with title:', title)

    // Use findOne instead of findById for searching by name
    const response = await RecipeModel.findOne({ title: title })

    if (!response) {
      res.status(404).json({ error: 'Recipe not found' })
      return
    }

    res.json({ data: response })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'An error occurred' })
  }
}

// creating a single recipe
const create = async (req, res, next) => {
  const {
    title,
    category,
    author,
    origin,
    ingredients,
    steps
  } = req.body
  try {
    const newRecipe = await RecipeModel.create({
      title,
      category,
      author,
      origin,
      ingredients,
      steps
    })

    res.status(201).json({
      data: newRecipe,
      message: 'New recipe added successfully',
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      error: error.message,
      message: 'An error occurred',
    })
  }
}

//update single recipe using id
const updateById = async (req, res, next) => {
  try {
    const recipeId = req.params.id;
    const updatedData = req.body;

    // Verify that server got the id and updated data
    console.log('Received request with ID:', recipeId);
    console.log('Updated data:', updatedData);

    const response = await RecipeModel.findByIdAndUpdate(recipeId, updatedData, { new: true });

    if (!response) {
      res.status(404).json({ error: 'Recipe not found' });
      return;
    }

    res.json({ message: 'Recipe is updated successfully', data: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

//delete single recipe using id

const deleteById = async (req, res, next) => {
  try {
    const recipeId = req.params.id
    //verify that server got the id
    console.log('Received request with ID:', recipeId)

    const response = await RecipeModel.findByIdAndDelete(recipeId)
    if (!response) {
      res.status(404).json({ error: 'Recipe not found' })
      
    }

    res.json({ message: 'Recipe is deleted successfully', data: response })
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'An error occurred' })
  }
}
module.exports = {
  readAll,
  readByTitle,
  readById,
  create,
  updateById,
  deleteById,
}

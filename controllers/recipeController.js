import recipeModel from "../models/recipeModel.js";
import multer from 'multer';


// Configurer Multer pour stocker les images dans la mémoire
// const storage = multer.memoryStorage(); 
//const upload = multer({ storage: storage });
// const upload = multer({ dest: 'public/assets/all-images/img-recipes/' })


export const newRecipe = async (req, res) => {
  const { title, author, category, origin, ingredients, steps } = req.body;

  // Validate request body
  if (!title || !author || !category || !origin || !ingredients || !steps) {
    return res.status(400).json({ message: 'Fill in all fields.' });
  }

  // Check if ingredients or steps are empty
  if (ingredients.length === 0 || steps.length === 0) {
    return res.status(400).json({ message: 'Fill in all fields.' });
  }

  try {
    let pictureUrl = ''; // Default empty string for picture URL

    // Check if an image was uploaded
    if (req.file) {
      pictureUrl = `/assets/all-images/img-recipes/${req.file.filename}`; // Assuming '/images' is the path where images are served
    }

    const newRecipe = await recipeModel.create({
      title,
      author,
      category,
      origin,
      ingredients,
      steps,
      picture: pictureUrl,
    });

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateRecipe = async (req, res) => {
  try {
    const { title, author, category, origin, ingredients, steps } = req.body;

    // Validate request body
    if (!title && !author && !category && !origin && !ingredients && !steps) {
      return res.status(400).json({ message: 'Fill in all fields.' });
    }

    // Check if ingredients or steps are empty
    if (ingredients.length === 0 || steps.length === 0) {
      return res.status(400).json({ message: 'Fill in all fields.' });
    }

    const existingRecipe = await recipeModel.findById(req.params.id);

    if (!existingRecipe) {
      return res.status(404).json({ message: `Recipe ID ${req.params.id} not found` });
    }

    let pictureUrl = existingRecipe.picture || ''; // Default to existing picture URL

    // Check if a new image was uploaded
    if (req.file) {
      // Assuming 'photo' is the name attribute of your file input
      pictureUrl = `/assets/all-images/img-recipes/${req.file.filename}`;
    }

    const updatedRecipe = await recipeModel.findByIdAndUpdate(req.params.id, {
      title: title || existingRecipe.title,
      author: author || existingRecipe.author,
      category: category || existingRecipe.category,
      origin: origin || existingRecipe.origin,
      ingredients: ingredients || existingRecipe.ingredients,
      steps: steps || existingRecipe.steps,
      picture: pictureUrl,
    }, { new: true });

    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Appliquer le middleware à la route updateRecipe
//updateRecipe.upload = upload.single('photo');
export default updateRecipe;


// export const updateRecipe = async (req, res) => {
//   try {
//     const { title, author, category, origin, ingredients, steps } = req.body;

//     // Validate request body
//     if (!title && !author && !category && !origin && !ingredients && !steps) {
//       return res.status(400).json({ message: 'Fill in all fields.' });
//     }

//     // Check if ingredients or steps are empty
//     if (ingredients.length === 0 || steps.length === 0) {
//       return res.status(400).json({ message: 'Fill in all fields.' });
//     }

//     const existingRecipe = await recipeModel.findById(req.params.id);

//     if (!existingRecipe) {
//       return res.status(404).json({ message: `Recipe ID ${req.params.id} not found` });
//     }

//     let pictureUrl = existingRecipe.picture || ''; // Default to existing picture URL

//     // Check if a new image was uploaded
//     if (req.file) {
//       // Assuming 'photo' is the name attribute of your file input
//       pictureUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
//     }

//     const updatedRecipe = await recipeModel.findByIdAndUpdate(req.params.id, {
//       title: title || existingRecipe.title,
//       author: author || existingRecipe.author,
//       category: category || existingRecipe.category,
//       origin: origin || existingRecipe.origin,
//       ingredients: ingredients || existingRecipe.ingredients,
//       steps: steps || existingRecipe.steps,
//       picture: pictureUrl,
//     }, { new: true });

//     res.json(updatedRecipe);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
//   // Apply the middleware to the updateRecipe route
//   updateRecipe.upload = upload.single('photo');
//   export default updateRecipe;






export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipeModel.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const requestedRecipe = await recipeModel.findById(req.params.id);
    if (!requestedRecipe) {
      return res.status(404).json({ message: `Recipe ID ${req.params.id} not found` });
    }
    res.json(requestedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}





// export const updateRecipe = async (req, res) => {
//   try {
//     const { title, author, category, origin, ingredients, steps } = req.body;

//     // Validate request body
//     if (!title && !author && !category && !origin && !ingredients && !steps) {
//       return res.status(400).json({ message: 'Fill in all fields.' });
//     }

//     // Check if ingredients or steps are empty
//     if (ingredients.length === 0 || steps.length === 0) {
//       return res.status(400).json({ message: 'Fill in all fields.' });
//     }

//     const existingRecipe = await recipeModel.findById(req.params.id);

//     if (!existingRecipe) {
//       return res.status(404).json({ message: `Recipe ID ${req.params.id} not found` });
//     }

//     let pictureUrl = existingRecipe.picture || ''; // Default to existing picture URL

//     // Check if a new image was uploaded
//     if (req.file) {
//       // Assuming 'photo' is the name attribute of your file input
//       pictureUrl = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
//     }

//     const updatedRecipe = await recipeModel.findByIdAndUpdate(req.params.id, {
//       title: title || existingRecipe.title,
//       author: author || existingRecipe.author,
//       category: category || existingRecipe.category,
//       origin: origin || existingRecipe.origin,
//       ingredients: ingredients || existingRecipe.ingredients,
//       steps: steps || existingRecipe.steps,
//       picture: pictureUrl,
//     }, { new: true });

//     res.json(updatedRecipe);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
//   // Apply the middleware to the updateRecipe route
//   updateRecipe.upload = upload.single('photo');
//   export default updateRecipe;


export const deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await recipeModel.findByIdAndDelete(req.params.id);

    if (!deletedRecipe) {
      return res.status(404).json({ message: `Recipe ID ${req.params.id} not found` });
    }

    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
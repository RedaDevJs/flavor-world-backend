import express from "express";
import { getAllRecipes, newRecipe, getOne , deleteRecipe } from '../controllers/recipeController.js';


const router = express.Router();
import storage from '../middleware/recipe-middleware'
import multer from 'multer';

const upload = multer({ storage })

// Create New Recipe:
router.post('/', [upload.single('file')], newRecipe);

// Get All Recipes:
router.get('/', getAllRecipes);

// Get One By id
router.get('/:id', getOne);

// Update Recipe:
// router.put('/:id', updateRecipe);

// Delete Recipe:
router.delete('/:id', deleteRecipe);


export default router;

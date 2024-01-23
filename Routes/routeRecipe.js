const express = require('express')
const router = express.Router()
const recipeController = require('../Controllers/recipeController')
const { validateToken } = require('../MiddleWares/tokenValidation')

const {
  validateRecipeInputEmpty,
  validate,
} = require('../MiddleWares/validators')

router.get('/', validateToken, recipeController.readAll);
router.get('/readbyid/:id', validateToken, recipeController.readById);
router.get('/readbytitle', validateToken, recipeController.readByTitle);
router.post('/create', validateToken, recipeController.create);
router.put('/update/:id', validateToken, recipeController.updateById);
router.delete('/delete/:id', validateToken, recipeController.deleteById);
module.exports = router

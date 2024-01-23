const { body, validationResult } = require('express-validator')

const validateRecipeInputEmpty = [
  body('title').notEmpty().withMessage('Title is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('origin').notEmpty().withMessage('Origin is required'),
  body('ingredients').isArray().withMessage('Ingredients must be an array'),
  body('steps').isArray().withMessage('Steps must be an array'),
]

const validateEmpty = (req, res, next) => {
  //we are using the error variable to catch the first error in the req object
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  return res.status(400).json({ errors: errors.array() })
}

module.exports = { validateEmpty, validateRecipeInputEmpty }

const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateRecipe} = require('../middleware');
const recipes = require('../controllers/recipes');
const Recipe = require('../models/recipes');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(recipes.index))
    .post(isLoggedIn, upload.array('image'), validateRecipe, catchAsync(recipes.createRecipe))

// RECIPE ROUTE (NEW)
router.get('/new', isLoggedIn, catchAsync(recipes.renderNewForm));

router.route('/:id')
    .get(catchAsync(recipes.showRecipe))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateRecipe, catchAsync(recipes.updateRecipe))
    .delete(isLoggedIn, isAuthor, catchAsync(recipes.deleteRecipe))

// RECIPE ROUTE (EDIT - SINGLE RECIPE)
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(recipes.renderEditForm));

module.exports = router;
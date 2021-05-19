const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const Recipe = require('../models/recipes');
const Review = require('../models/review');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const reviews = require('../controllers/reviews');

// REVIEW ROUTES

// REVIEW ROUTE (POST - CREATE A REVIEW)
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

// REVIEW ROUTE (DELETE - DELETE A REVIEW)
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;
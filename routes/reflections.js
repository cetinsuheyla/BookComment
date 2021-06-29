const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../helpers/catchAsync');
const ExpressError = require('../helpers/ExpressError');
const reflections = require('../controllers/reflections');
const {isLoggedIn, validateReflection, isReflectionAuthor} = require('../middleware');


router.post('/', isLoggedIn, validateReflection, catchAsync(reflections.createReflection))

router.delete('/:reflectionId', isLoggedIn, isReflectionAuthor, catchAsync(reflections.deleteReflection))

module.exports = router;

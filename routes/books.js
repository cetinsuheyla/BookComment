const express = require('express');
const router = express.Router();
const catchAsync = require('../helpers/catchAsync');
const ExpressError = require('../helpers/ExpressError');
const Book = require('../models/book');
const User = require('../models/user');
const books = require('../controllers/books');
const {isLoggedIn, isOwner, validateBook} = require('../middleware');
var multer  = require('multer');
const {storage} = require('../cloudinary');
var upload = multer({ storage });

router.route('/')
  .get(catchAsync(books.index))
  .post(isLoggedIn, upload.array('image'), validateBook, catchAsync(books.addNewBook))


router.get('/new', isLoggedIn, books.renderNewForm);

router.route('/:id')
  .get(catchAsync(books.showBook))
  .put(isLoggedIn, isOwner, upload.array('image'), validateBook, catchAsync(books.editBook))
  .delete(isLoggedIn, isOwner, catchAsync(books.deleteBook))

router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(books.renderEditForm));


module.exports = router;

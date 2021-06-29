const Book = require('../models/book');

module.exports.index = async(req, res) => {
  const books = await Book.find({});
  res.render('books/index', {books});
}

module.exports.renderNewForm = (req, res) => {
  res.render('books/new');
}

module.exports.addNewBook = async(req, res) => {
  const book = new Book(req.body.book);
  book.images =   req.files.map(f => ({url: f.path, filename: f.filename}));
  book.owner = req.user._id;
  await book.save();
  req.flash('success', 'Succesfully submitted a new book.');
  res.redirect(`/books/${book._id}`);
}

module.exports.renderEditForm = async(req, res) => {
  const {id} = req.params;
  const book = await Book.findById(id);
  res.render('books/edit', {id, book});
}

module.exports.showBook = async(req, res) => {
  const {id} = req.params;
  const book = await Book.findById(id).populate({path: 'reflections', populate: {path: 'author'}}).populate('owner');
  if(!book){
    req.flash('error', 'That book is not found');
    res.redirect('/books');
  }
  res.render('books/show', {book});
}

module.exports.editBook = async(req, res) => {
  const {id} = req.params;
  const book = await Book.findByIdAndUpdate(id, {...req.body.book});
  book.images.push(...req.files.map(f => ({url: f.path, filename: f.filename})));
  await book.save();
  req.flash('success', 'Succesfully updated!');
  res.redirect(`/books/${book._id}`);
}

module.exports.deleteBook = async(req, res) => {
  const {id} = req.params;
  const book = await Book.findById(id);
  await Book.findByIdAndDelete(id);
  req.flash('success', 'Succesfully deleted!');
  res.redirect('/books');
}

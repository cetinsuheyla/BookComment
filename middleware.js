const ExpressError = require('./helpers/ExpressError');
const {bookSchema, reflectionSchema} = require('./joiSchemas.js');
const Book = require('./models/book');
const Reflection = require('./models/reflection');

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
      req.session.returnTo = req.originalUrl;
      req.flash('error', 'You must be signed in');
      return res.redirect('/login');
    }
    next();
}

module.exports.validateBook = (req, res, next) => {

  const {error} = bookSchema.validate(req.body);
  if(error){
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  }else{
    next();
  }
}

module.exports.isOwner = async(req, res, next) => {
  const {id} = req.params;
  const book = await Book.findById(id);
  if (!book.owner.equals(req.user._id)){
    req.flash('error', 'You do not have permission to do that');
    return res.redirect(`/books/${book._id}`);
  }
  next();
}

module.exports.isReflectionAuthor = async(req, res, next) => {
  const {id, reflectionId} = req.params;
  const book = await Book.findById(id);
  const reflection = await Reflection.findById(reflectionId);
  if (!reflection.author.equals(req.user._id)){
    req.flash('error', 'You do not have permission to do that');
    return res.redirect(`/books/${book._id}`);
  }
  next();
}

module.exports.validateReflection = (req, res, next) => {
  const {error} = reflectionSchema.validate(req.body);
  if(error){
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  }else{
    next();
  }
}

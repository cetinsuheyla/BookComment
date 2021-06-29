const Reflection = require('../models/reflection');
const Book = require('../models/book');


module.exports.createReflection = async(req, res) => {
  const {id} = req.params;
  const book = await Book.findById(id);
  const reflection = new Reflection(req.body.reflection);
  reflection.author = req.user._id;
  book.reflections.push(reflection);
  await reflection.save();
  await book.save();
  req.flash('success', 'We got your reflection, thanks!');
  res.redirect(`/books/${book._id}`);
}

module.exports.deleteReflection = async(req, res) =>{
  const {id, reflectionId} = req.params;
  await Book.findByIdAndUpdate(id, {$pull: {reflections: reflectionId}});
  await Reflection.findByIdAndDelete(reflectionId);
  req.flash('success', 'Succesfully deleted your reflection, thanks!');
  res.redirect(`/books/${id}`);

}

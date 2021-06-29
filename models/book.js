const mongoose = require('mongoose');
const Reflection = require('./reflection');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  images:[
    {
      url: String,
      filename: String
    }
  ],
  title: String,
  author: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reflections: [
    {
    type: Schema.Types.ObjectId,
    ref: 'Reflection'
  }
]
}, {strict: false});


//the purpose of adding this middleware is to delete reflections when the related book is deleted.


const Book = mongoose.model('Book', BookSchema);



module.exports = Book;

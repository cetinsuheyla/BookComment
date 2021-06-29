const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReflectionSchema = new Schema({
  rating: Number,
  body: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Reflection = mongoose.model('Reflection', ReflectionSchema);

module.exports = Reflection;

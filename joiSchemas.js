const Joi = require('joi');

module.exports.bookSchema = Joi.object({
  book:Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    comment: Joi.string()
  }).required()
})

module.exports.reflectionSchema = Joi.object({
  reflection: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    body: Joi.string().required()
  }).required()
})

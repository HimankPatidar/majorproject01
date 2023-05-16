const Joi = require('joi');
const { number } = require('joi');

module.exports.PostSchema = Joi.object({
    post: Joi.object({
        title: Joi.string().required(),
        image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required()
});


module.exports.reviewSchema = Joi.object({
    review: Joi.object({
       
        body: Joi.string().required()
    }).required()
})

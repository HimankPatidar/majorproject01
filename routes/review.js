const express = require('express');
const router = express.Router({ mergeParams: true });

const {Postmodel} = require('../models/usermodel');
const Review = require('../models/review');

const { reviewSchema } = require('../schemas.js');


const {ExpressError} = require('../utils/ExpressError');


const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}



router.post('/', validateReview, async (req, res) => {
    const post = await Postmodel.findById(req.params.id);
    const review = new Review(req.body.review);
    console.log(review)
    post.reviews.push(review);
    await review.save();
    await post.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/posts/${post._id}`);
})

// router.delete('/:postId', async (req, res) => {
//     const { id, reviewId } = req.params;
//     // await Postmodel.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
//     await Review.findByIdAndDelete(reviewId);
//     req.flash('success', 'Successfully deleted review')
//     res.redirect(`/posts/${id}`);
// })

module.exports = router;
const express = require('express');
const router = express.Router();
const CatchAsync = require("../utils/CatchAsync")
const {postController} = require("../controller/postController")
const {isLoggedIn, isAuthor} = require("../middleware")


router.get('/', postController.homepage)
router.get('/posts', postController.getpost)
router.get('/posts/new', isLoggedIn, postController.createpost)
router.post('/posts', isLoggedIn, postController.newpost)
router.get('/posts/:id', isLoggedIn,postController.showpost)
router.post('/posts/new', postController.createpost)


router.get('/posts/:id/edit', isLoggedIn,isAuthor, postController.editpost)
router.put('/posts/:id',isLoggedIn, postController.updatepostById)
router.delete('/posts/:id',isLoggedIn, postController.deletepostById)

// router.get('/posts/:id', postController.commentid)
// router.post('/posts/:id/comments', validateReview, postController.commentpost)
// router.delete("/posts/:id/reviewsId", postController.deletecomment)

module.exports = router;

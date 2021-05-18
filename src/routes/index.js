const express = require('express');
const router = express.Router();
const { getBlogPost, createBlogPost, updateBlogPost, deleteBlogPost } = require('./blog');
const { createComment, createReply, getComment, updateComment, deleteComment  } = require('./comment');

router
  .get('/', (req, res, next) => {
    res.json({message: "Application Healthy!", status: 200 })
  })
  .get('/api/health', (req, res, next) => {
    res.json({message: "Application Healthy!", status: 200 });
  });

router
  .post('/api/blog', createBlogPost)
  .get('/api/blog/:id', getBlogPost)
  .put('/api/blog/:id', updateBlogPost)
  .delete('/api/blog/:id', deleteBlogPost);

router
  .post('/api/comment', createComment)
  .post('/api/comment/:id', createReply)
  .get('/api/comment/:id', getComment)
  .put('/api/comment/:id', updateComment)
  .delete('/api/comment/:id', deleteComment);

// TODO: Add routes for:
// getting all posts, getting all comments, getting replies for a comment
module.exports = router;

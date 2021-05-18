const express = require('express');
const router = express.Router();
const { getBlogPost, createBlogPost, updateBlogPost, deleteBlogPost } = require('./blog');
const { createComment, createReply, getComment, updateComment, deleteComment  } = require('./comment');


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

module.exports = router;

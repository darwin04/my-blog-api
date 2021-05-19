const express = require('express');
const router = express.Router();
const { getPost, getAllPosts, createPost, updatePost, deletePost } = require('./blog');
const { createComment, getAllComments, getComment, updateComment, deleteComment, getThread  } = require('./comment');

router
  .get('/', (req, res, next) => {
    res.json({message: "Application Healthy!", status: 200 })
  })
  .get('/api/health', (req, res, next) => {
    res.json({message: "Application Healthy!", status: 200 });
  });

router
  .post('/api/post', createPost)
  .get('/api/post', getAllPosts)
  .get('/api/post/:id', getPost)
  .put('/api/post/:id', updatePost)
  .delete('/api/post/:id', deletePost);

router
  .post('/api/comment', createComment)
  .get('/api/comment', getAllComments)
  .get('/api/comment/thread/:threadId', getThread)
  .get('/api/comment/:id', getComment)
  .put('/api/comment/:id', updateComment)
  .delete('/api/comment/:id', deleteComment);

// TODO: Add routes for:
// getting all posts, getting all comments, getting replies for a comment
module.exports = router;

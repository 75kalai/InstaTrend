const router = require('express').Router();

router.post('/posts',(req, res)=>{
     // Create new post
});


router.get('/posts/:postID',(req, res)=>{
     // Retrieve post
});


router.put('/posts/:postID',(req, res)=>{
     // Edit post
});


router.delete('/posts/:postID',(req, res)=>{
     // Delete post
});


router.post('/posts/:postID/like',(req, res)=>{
     // Like post
});

router.post('/posts/:postID/unlike',(req, res)=>{
     // Unlike post
});

router.get('/posts/:postID/comments',(req, res)=>{
     // Get comments for the post
});

router.post('/posts/:postID/comments',(req, res)=>{
     // Add comment on a post
});

router.post('/posts/:postID/comments/:commentId/like',(req, res)=>{
     // Like a comment on a post
});

router.post('/posts/:postID/comments/:commentId/unlike',(req, res)=>{
     // Unlike a comment on a post
});

router.post('/posts/:postID/comments/:commentId/delete',(req, res)=>{
     // Delete comment on a post
});


module.exports = router
User Authentication:

/api/auth/signup (POST): Create a new user account.
/api/auth/login (POST): Log in an existing user.
/api/auth/logout (POST): Log out the currently authenticated user.
/api/auth/me (GET): Get information about the currently authenticated user
--------------------------------------------------------------------------

User Profile:

/api/users/:userId (GET): Get public information about a user.
/api/users/:userId/follow (POST): Follow a user.
/api/users/:userId/unfollow (POST): Unfollow a user.
----------------------------------------------------

Post Management:

/api/posts (POST): Create a new post.
/api/posts/:postId (GET): Get details of a specific post.
/api/posts/:postId/edit (PUT): Edit a post.
/api/posts/:postId/delete (DELETE): Delete a post.
--------------------------------------------------

Feed and Timeline:

/api/feed (GET): Get the user's feed (posts from followed users).
/api/posts/:postId/like (POST): Like a post.
/api/posts/:postId/unlike (POST): Unlike a post.
------------------------------------------------

Comments:

/api/posts/:postId/comments (GET): Get comments for a specific post.
/api/posts/:postId/comments (POST): Add a new comment to a post.
/api/posts/:postId/comments/:commentId/delete (DELETE): Delete a comment.
-------------------------------------------------------------------------

/Notifications:

/api/notifications (GET): Get notifications for the authenticated user.
-----------------------------------------------------------------------

Explore:

/api/explore (GET): Get popular or recommended posts.
-----------------------------------------------------

Search:

/api/search/users (GET): Search for users.
/api/search/posts (GET): Search for posts.
------------------------------------------

User Settings:

/api/settings/profile (GET): Get user profile settings.
/api/settings/profile (PUT): Update user profile settings.
----------------------------------------------------------

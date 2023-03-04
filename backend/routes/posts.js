const express = require("express");

const checkAuth = require("../middleware/check-auth");
const PostsController = require("../controllers/posts");
const extractFile = require("../middleware/file");

const router = express.Router();

//new posts
router.post("", checkAuth, extractFile, PostsController.addPost);

//update post
router.put("/:id", checkAuth, extractFile, PostsController.updatePost);

//get posts
router.get("", PostsController.getPosts);

//get one post
router.get("/:id", PostsController.getPost);

//delete post
router.delete("/:id", checkAuth, PostsController.deletePost);

module.exports = router;

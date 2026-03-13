// server/routes/postRoutes.js
const express = require("express");
const { createPost, getPosts } = require("../controllers/PostController");
const { protect } = require("../middleware/auth"); // adjust path if different

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", protect, getPosts);

module.exports = router;

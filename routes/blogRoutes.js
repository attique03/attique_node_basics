const express = require("express");
const {
  getBlogs,
  getBlogById,
  handleNewBlog,
  createBlog,
  deleteBlog,
  getBlogToUpdate,
  updateBlog,
} = require("../controllers/blogController");
const { checkUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:id/edit", updateBlog);
router.get("/create", handleNewBlog);
router.get("/", getBlogs);
router.post("/", checkUser, createBlog);
router.get("/:id", getBlogById);
router.delete("/:id", deleteBlog);
router.get("/:id/edit", getBlogToUpdate);

module.exports = router;

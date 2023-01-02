const Blog = require("../models/blog");

const getBlogs = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { blogs: result, title: "All blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getBlogById = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
      res.render("404", { title: "Blog not found" });
    });
};

const getBlogToUpdate = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("edit", { blogData: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
      res.render("404", { title: "Blog not found" });
    });
};

const handleNewBlog = (req, res) => {
  res.render("create", { title: "Create a new blog" });
};

const createBlog = (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    snippet: req.body.snippet,
    body: req.body.body,
    blogUser: req?.user?._id,
  });

  console.log("Body Data ", req.body);
  console.log("USer ===> ", req.user);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateBlog = (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndUpdate({_id: id}, req.body)
    .then((result) => {
      console.log('Result ===> ', result);
      res.redirect("/blogs")
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteBlog = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/blogs" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getBlogs,
  getBlogById,
  handleNewBlog,
  createBlog,
  deleteBlog,
  getBlogToUpdate,
  updateBlog
};

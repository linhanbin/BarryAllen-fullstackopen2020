const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    user: user._id,
  });

  const saveBlog = await blog.save();

  user.blogs = user.blogs.concat(saveBlog._id);
  await user.save();

  response.json(saveBlog.toJSON());
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {
    new: true,
  });

  response.json(savedBlog.toJSON());
});

blogsRouter.delete("/:id", async (request, response) => {
  const token = getTokenFrom(request);

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = await Blog.findById(request.params.id);

  if (!decodedToken.id === blog.user.toString()) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;

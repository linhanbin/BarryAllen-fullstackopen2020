const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((blog) => blog.likes));
  return blogs.find((blog) => blog.likes == mostLikes);
};

const mostBlogs = (blogs) => {
  const authors = [...new Set(blogs.map((blog) => blog.author))];
  const authorsWithBlogs = authors.map((author) => ({
    author,
    blogs: blogs.filter((i) => author == i.author).length,
  }));
  const reducer = (pre, cur) => (pre.blogs > cur.blogs ? pre : cur);
  return authorsWithBlogs.reduce(reducer, authorsWithBlogs[0]);
};

const mostlike = (blogs) => {
  const authors = [...new Set(blogs.map((blog) => blog.author))];
  const sum = (pre, cur) => pre + cur.likes;
  const authorsWithLikes = authors.map((author) => ({
    author,
    likes: blogs.filter((i) => i.author == author).reduce(sum, 0),
  }));
  const reducer = (pre, cur) => (pre.likes > cur.likes ? pre : cur);
  return authorsWithLikes.reduce(reducer, authorsWithLikes[0]);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostlike,
};

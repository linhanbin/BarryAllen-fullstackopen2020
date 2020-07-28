const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));

  const promiseArray = blogObjects.map((blog) => blog.save());

  await Promise.all(promiseArray);
});

describe("when there is initially some notes saved", () => {
  test("blogs are returned as json", async () => {
    const res = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
    expect(res.body).toHaveLength(helper.initialBlogs.length);
  });

  test("check if blog id exists", async () => {
    const res = await api.get("/api/blogs");
    res.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe("addition of a new blog", () => {
  test("succeeds with valid data", async () => {
    const newBlog = {
      title: "test1",
      author: "barry",
      url: "barry-blog.com",
    };
    await api.post("/api/blogs").send(newBlog).expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);

    const authors = blogsAtEnd.map((n) => n.author);
    expect(authors).toContain("barry");
  });

  test("like is given default value", async () => {
    const newBlog = {
      title: "test2",
      author: "barry",
      url: "barry.com",
    };
    await api.post("/api/blogs").send(newBlog).expect(200);

    const blogsAtEnd = await helper.blogsInDb();

    const addedBlog = blogsAtEnd.filter((n) => n.author === "barry")[0];
    expect(addedBlog.likes).toBe(0);
  });

  test("fails with status code 400 if no url given", async () => {
    const newBlog = {
      title: "test3",
      author: "barry",
    };
    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length);
  });

  test("fails with status code 400 if no title given", async () => {
    const newBlog = {
      author: "barry",
      url: "barry1.com",
    };
    await api.post("/api/blogs").send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});

import { DUMMY_POSTS } from "../data/dummyData.js";

const posts = [...DUMMY_POSTS];

export function getPosts(req, res) {
  res.status(200).json(posts);
}

export function createPost(req, res) {
  // TODO create post in DB
  const { title, author, content } = req.body;

  const newPost = {
    id: new Date().getTime().toString(),
    date: new Date().toISOString().split("T")[0],
    title,
    author,
    content,
  };

  posts.push(newPost);

  res.status(201).json({
    message: "Post Created Successfully",
    data: {
      newPost,
    },
  });
}

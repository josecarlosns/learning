import { DUMMY_POSTS } from "../data/dummyData.js";

export function getPosts(req, res) {
  res.status(200).json(DUMMY_POSTS);
}

export function createPost(req, res) {
  // TODO create post in DB
  const { title, content } = req.body;

  res.status(201).json({
    message: "Post Created Successfully",
    data: {
      id: new Date().toISOString(),
      title,
      content,
    },
  });
}

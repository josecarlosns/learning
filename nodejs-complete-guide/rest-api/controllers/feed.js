export function getPosts(req, res) {
  res.status(200).json({
    title: "First post",
    content: "First post content",
  });
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

export function getPosts(req, res, next) {
  res.status(200).json({
    title: "First post",
    content: "First post content",
  });
}

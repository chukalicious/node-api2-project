const express = require("express");
const router = express.Router();

const Comments = require("./db-helpers");

router.get(`/:id/comments`, async (req, res) => {
  const id = req.params.id;
  try {
    const comment = await Comments.findPostComments(id);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.messag });
  }
});

router.post(`/:id/comments`, async (req, res) => {
  const { id } = req.params;
  const comment = req.body;
  if (!comment.text) {
    res.status(404).json({ message: "Please provide text for the comment." });
  } else {
    try {
      const newComment = await Comment.insertComment(comment);
      res.status(201).json(newComment);
    } catch (err) {
      res.status(500).json({ message: "Could not add comment at this time" });
    }
  }
});

module.exports = router;

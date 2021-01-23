const express = require("express");
const router = express.Router();

const Comments = require("./db-helpers");

router.get(`/:id/comments`, async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comments.findPostComments(id);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.messag });
  }
});

module.exports = router;

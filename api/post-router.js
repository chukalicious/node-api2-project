const express = require("express");

const router = express.Router();

const Posts = require("./db-helpers");

router.post(`/`, (req, res) => {
  const postBody = req.body;
  if (!postBody.title || !postBody.contents) {
    res.status(400).json({ message: "must include title and content" });
  } else {
    Posts.insert(postBody)
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  }
});

router.get(`/`, async (req, res) => {
  try {
    const posts = await Posts.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get(`/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await Posts.findById(id);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

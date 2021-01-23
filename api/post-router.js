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
  const post = await Posts.findById(id);
  if (!post) {
    res
      .status(404)
      .json({ message: "The post with the specified ID does not exist" });
  } else {
    try {
      res.status(200).json(post);
    } catch (err) {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved" });
    }
  }
});

router.put(`/:id`, async (req, res) => {
  const id = req.params.id;
  const updatedPost = req.body;
  if (!updatedPost.title || !updatedPost.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  } else {
    try {
      const editedPost = await Posts.update(id, updatedPost);
      if (editedPost) {
        res.status(201).json(editedPost);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    } catch (err) {
      res
        .status(500)
        .json({ error: "The post information could not be modified" });
    }
  }
});

router.delete(`/:id`, async (req, res) => {
  const { id } = req.params;
  try {
    const postDelete = await Posts.remove(id);
    if (postDelete) {
      console.log("Post to delete: ", postDelete);
      res.status(204).json(postDelete);
    } else {
      res
        .status(404)
        .json({ messsage: "The post with the specified ID does not exist." });
    }
  } catch (err) {
    res.status(500).json({ message: "The post could not be removed" });
  }
});

module.exports = router;

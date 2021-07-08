const express = require("express");

const server = express();

const PostsRouter = require("./post-router");
const CommentsRouter = require("./comments-router");

server.use(express.json());
server.use(`/api/posts`, PostsRouter);
server.use(`/api/posts`, CommentsRouter);

module.exports = server;

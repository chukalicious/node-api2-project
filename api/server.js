const express = require("express");

const server = express();

const PostsRouter = require("./post-router");

server.use(express.json());
server.use(`/api/posts`, PostsRouter);

module.exports = server;

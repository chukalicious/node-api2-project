const express = require("express");
const server = require("./api/server");

const PORT = 5500;
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

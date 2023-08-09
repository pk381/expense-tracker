const path = require("path");
const rootDir = require("../util/path");

exports.getIndex = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "index.html"));
};

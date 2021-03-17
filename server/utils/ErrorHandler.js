function errorHandler(err, req, res, next) {
  if(err.name === "UnauthorizedError") {
    return res.status(401).json("Token invalid")
  }
  return res.status(500).json(err.message)
}

module.exports = errorHandler;

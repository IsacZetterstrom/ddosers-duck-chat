function authenticateAdmin(req, res, next) {
  if (req.jwtPayload.userRole == "admin") {
    next();
  } else {
    res.status(401).send("Incorrect role");
  }
}

export default { authenticateAdmin };

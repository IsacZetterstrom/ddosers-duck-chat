import jwtUtil from "../utils/jwtUtil.js";

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    res.send("You need to supply a token!");
    return;
  }
  const payload = jwtUtil.verify(token);
  if (payload.username) {
    next();
  } else {
    res.status(401).send("Your token is invalid!");
  }
}

export default { authenticate };

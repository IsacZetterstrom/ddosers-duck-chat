import jwtUtil from "../utils/jwtUtil.js";

function authenticate(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    res.status(400).send("You need to supply a token!");
    return;
  }
  try {
    const payload = jwtUtil.verify(token);
    if (payload.username) {
      req.jwtPayload = payload;
      next();
    } else {
      res.status(400).send("Your token is invalid!");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Bad token");
  }
}

export default { authenticate };

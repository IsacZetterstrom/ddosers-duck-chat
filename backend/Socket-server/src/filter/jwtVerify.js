import Jwt from "jsonwebtoken";
import fs from "fs";

const publicKey = fs.readFileSync("./config/public.pem");

function isRequestFromServer(req, res, next) {
  const token = req.headers.authorization;
  const payload = Jwt.verify(token, publicKey);

  if (payload.role == "express-server") {
    next();
  } else {
    res.status(401).send("Not authenticated!");
  }
}

export default { isRequestFromServer };

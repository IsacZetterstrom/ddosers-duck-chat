import Jwt from "jsonwebtoken";
import fs from "fs";

const publicKey = fs.readFileSync("./config/public.pem");

function isRequestFromServer(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    res.status(400).send("Token not provided!");
    return;
  }

  try {
    const payload = Jwt.verify(token, publicKey);

    if (payload.role == "express-server") {
      next();
    } else {
      res.status(401).send("Not authorized!");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Bad Token!");
  }
}

export default { isRequestFromServer };

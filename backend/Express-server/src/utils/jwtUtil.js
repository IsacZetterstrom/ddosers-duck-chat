import Jwt from "jsonwebtoken";
import fs from "fs";

const privateKey = fs.readFileSync("./config/private.pem");
const publicKey = fs.readFileSync("./config/public.pem");

function createToken(payload) {
  return Jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    expiresIn: "900s",
  });
}

function verify(token) {
  return Jwt.verify(token, publicKey);
}

export default { createToken, verify };

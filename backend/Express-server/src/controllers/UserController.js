import { User } from "../db/models/User.js";
import bcrypt from "bcrypt";
import jwtUtil from "../utils/jwtUtil.js";

async function login(req, res) {
  const { username, password } = req.body;
  if (username && password) {
    const user = await User.findOne({ username });
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwtUtil.createToken({
          username: user.username,
          userRole: user.userRole,
        });
        res.send({ token, message: "You have logged in!" });
      } else {
        res.status(404).send("Incorrect username or password!");
      }
    } else {
      res.status(404).send("Incorrect username or password!");
    }
  } else {
    res.status(400).send("Missing credentials!");
  }
}

async function createUser(req, res) {
  const { username, password } = req.body;
  if (username && password) {
    const user = await User.findOne({ username });

    if (user != null) {
      res.status(409).send("That username is already taken!");
      return;
    }

    bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS),
      async (error, hash) => {
        if (!error) {
          await User.create({
            username,
            password: hash,
            userRole: "regular",
          });
          res.status(201).send("Your account has been created!");
        } else {
          res.status(500).send("Something went wrong!");
        }
      }
    );
  } else {
    res.status(400).send("Missing information!");
  }
}

export default { login, createUser };

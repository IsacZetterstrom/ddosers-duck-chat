import "dotenv/config";
import express from "express";
import router from "./src/routes/router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/ducks/api", router);

app.listen(3001, () => {
  console.log("Started listening on port 3001");
});

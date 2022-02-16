import { urlencoded, json } from "express";
import express = require("express");
import * as dotenv from "dotenv";
import { database } from "./database";
var cors = require("cors");

dotenv.config();
new database().connect();

const router = express.Router();
router.use(urlencoded({ extended: false }));
const app = express();
app.use(json());
app.options("*", cors());

app.get("/test", (req, res) => {
  res.send("Hello World I am running locally");
});

app.get("/todos", async (req, res) => {
  const todos = await database.instance.getTodos();
  res.set("Access-Control-Allow-Origin", "*");
  return res.send(todos);
});
app.post("/todos", async (req, res) => {
  const title = req.body.title;
  res.set("Access-Control-Allow-Origin", "*");

  try {
    await database.instance.addNewTodo({ title });
    return res.send("ok");
  } catch (error) {
    return res.send("internal error");
  }
});
app.delete("/todos", async (req, res) => {
  const id = req.query.id as string;
  res.set("Access-Control-Allow-Origin", "*");
  
  try {
    await database.instance.removeTodo(parseInt(id));
    return res.send("ok");
  } catch (error) {
    return res.send("internal error");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}`);
});

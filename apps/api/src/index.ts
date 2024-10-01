import { getDatasource, UserEntity } from "@idealgma/datasource";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const datasource = getDatasource();
const app = express();

datasource.initialize();

app.get("/", async function (req, res) {
  const repo = datasource.getRepository(UserEntity);
  const users = await repo.find();

  res.send(`Hello ${users[0].id}`);
});

app.listen(process.env.PORT);

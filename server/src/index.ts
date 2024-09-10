import express from "express";
import requestCounter from "./middlewares/RequestCounter";
import client from "prom-client";
import activeUsers from "./middlewares/ActiveUsers";
import responseTime from "./middlewares/ResponseTime";

const app = express();

app.use(express.json());
app.use(requestCounter);
app.use(activeUsers);
app.use(responseTime);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/bad", (req, res) => {
  res.status(400).send("bad res");
});

app.post("/slow", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  res.status(200).send("slow res");
});

app.get("/metrics", async (req, res) => {
  const metrics = await client.register.metrics();
  res.set("Content-Type", client.register.contentType);
  res.end(metrics);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

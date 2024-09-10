//make sense on websocket server

import { RequestHandler } from "express";
import { Gauge } from "prom-client";

const activeUsersGauge = new Gauge({
  name: "active_users",
  help: "number of active users",
  labelNames: ["path"],
});

const activeUsers: RequestHandler = (req, res, next) => {
  activeUsersGauge.inc();
  res.on("finish", () => {
    activeUsersGauge.dec();
  });
  next();
};

export default activeUsers;

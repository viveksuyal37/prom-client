import { RequestHandler } from "express";
import { Counter } from "prom-client";

const counter = new Counter({
  name: "request_count",
  help: "total number of requests",
  labelNames: ["method", "path", "statusCode"],
});

const requestCounter: RequestHandler = (req, res, next) => {


  res.on("finish", () => {
    counter.inc({
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
    });
  });

  next();
};

export default requestCounter;

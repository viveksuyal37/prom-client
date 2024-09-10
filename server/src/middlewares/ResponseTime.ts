import { RequestHandler } from "express";
import { Histogram } from "prom-client";

const responseTimeHistogram = new Histogram({
  name: "response_time",
  help: "HTTP requests response time in ms",
  labelNames: ["method", "route", "code"],
  buckets: [10, 50, 200, 500, 1000, 2000, 5000],
});

const responseTime: RequestHandler = (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    responseTimeHistogram.observe(
      {
        method: req.method,
        route: req.path,
        code: res.statusCode,
      },
      duration
    );
  });
  next();
};

export default responseTime;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prom_client_1 = require("prom-client");
const responseTimeHistogram = new prom_client_1.Histogram({
    name: "response_time",
    help: "HTTP requests response time in ms",
    labelNames: ["method", "route", "code"],
    buckets: [10, 50, 200, 500, 1000, 2000, 5000],
});
const responseTime = (req, res, next) => {
    const startTime = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - startTime;
        responseTimeHistogram.observe({
            method: req.method,
            route: req.path,
            code: res.statusCode,
        }, duration);
    });
    next();
};
exports.default = responseTime;

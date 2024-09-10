"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prom_client_1 = require("prom-client");
const counter = new prom_client_1.Counter({
    name: "request_count",
    help: "total number of requests",
    labelNames: ["method", "path", "statusCode"],
});
const requestCounter = (req, res, next) => {
    res.on("finish", () => {
        counter.inc({
            method: req.method,
            path: req.path,
            statusCode: res.statusCode,
        });
    });
    next();
};
exports.default = requestCounter;

"use strict";
//make sense on websocket server
Object.defineProperty(exports, "__esModule", { value: true });
const prom_client_1 = require("prom-client");
const activeUsersGauge = new prom_client_1.Gauge({
    name: "active_users",
    help: "number of active users",
    labelNames: ["path"],
});
const activeUsers = (req, res, next) => {
    activeUsersGauge.inc();
    res.on("finish", () => {
        activeUsersGauge.dec();
    });
    next();
};
exports.default = activeUsers;

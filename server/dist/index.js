"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RequestCounter_1 = __importDefault(require("./middlewares/RequestCounter"));
const prom_client_1 = __importDefault(require("prom-client"));
const ActiveUsers_1 = __importDefault(require("./middlewares/ActiveUsers"));
const ResponseTime_1 = __importDefault(require("./middlewares/ResponseTime"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(RequestCounter_1.default);
app.use(ActiveUsers_1.default);
app.use(ResponseTime_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/bad", (req, res) => {
    res.status(400).send("bad res");
});
app.post("/slow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise((resolve) => setTimeout(resolve, 2000));
    res.status(200).send("slow res");
}));
app.get("/metrics", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const metrics = yield prom_client_1.default.register.metrics();
    res.set("Content-Type", prom_client_1.default.register.contentType);
    res.end(metrics);
}));
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

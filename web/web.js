"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const webApp = express_1.default.Router();
webApp.get("/", (req, res) => {
    res.send("Hiii to my Web app server");
});
module.exports = webApp;

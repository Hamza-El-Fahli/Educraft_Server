import express, { Request, Response } from "express";

const webApp = express.Router();

webApp.get("/", (req: Request, res: Response) => {
  res.send("Hiii to my Web app server");
});

module.exports = webApp;

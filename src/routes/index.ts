import express, { Router } from "express";

export class IndexRouter {
  router: Router;
  constructor() {
    this.router = express.Router();

    this.router.get('/', (req, res, next) => {
      res.send({message: "API Places"});
    });;
  }
}

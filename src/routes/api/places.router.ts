import express, { Router } from "express";
import places from "../../controllers/places.controller";

/**
 * Router for places
 */
export class PlacesRouter {
  router: Router;
  constructor() {
    this.router = express.Router();
    this.router.post("/", places.create);
    this.router.get("/", places.getAll);
    this.router.delete("/:id", places.delete);
    this.router.get("/distance", places.distance)
  }
}

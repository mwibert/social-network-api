import express, { Router, Request, Response } from "express";
import {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} from "../../controllers/thoughtController";

const router: Router = express.Router();

router
  .route("/")
  .get((req: Request, res: Response) => getThoughts(req, res))
  .post((req: Request, res: Response) => createThought(req, res));
router
  .route("/:thoughtId")
  .get((req: Request, res: Response) => getThoughtById(req, res))
  .put((req: Request, res: Response) => updateThought(req, res))
  .delete((req: Request, res: Response) => deleteThought(req, res));
router
  .route("/:thoughtId/reactions")
  .post((req: Request, res: Response) => addReaction(req, res));
router
  .route("/:thoughtId/reactions/:reactionId")
  .delete((req: Request, res: Response) => removeReaction(req, res));

export default router;

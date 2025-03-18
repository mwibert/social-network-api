import { Router } from "express";
import thoughtController from "../../controllers/thoughtController";

const router = Router();

// /api/thoughts
router
  .route("/")
  .get(thoughtController.getThoughts)
  .post(thoughtController.createThought);

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(thoughtController.getSingleThought)
  .put(thoughtController.updateThought)
  .delete(thoughtController.deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(thoughtController.addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router
  .route("/:thoughtId/reactions/:reactionId")
  .delete(thoughtController.removeReaction);

export default router;

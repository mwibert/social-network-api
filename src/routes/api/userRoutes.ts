import { Router } from "express";
import {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} from "../../controllers/userController";
import thoughtController from "../../controllers/thoughtController";

const router = Router();

// /api/users
router.route("/").get(getUsers).post(createUser);

// /api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

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

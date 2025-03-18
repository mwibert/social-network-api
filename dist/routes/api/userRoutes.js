"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../../controllers/userController");
const thoughtController_1 = __importDefault(require("../../controllers/thoughtController"));
const router = (0, express_1.Router)();
// /api/users
router.route("/").get(userController_1.getUsers).post(userController_1.createUser);
// /api/users/:userId
router.route("/:userId").get(userController_1.getSingleUser).put(userController_1.updateUser).delete(userController_1.deleteUser);
// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(userController_1.addFriend).delete(userController_1.removeFriend);
// /api/thoughts
router
    .route("/")
    .get(thoughtController_1.default.getThoughts)
    .post(thoughtController_1.default.createThought);
// /api/thoughts/:thoughtId
router
    .route("/:thoughtId")
    .get(thoughtController_1.default.getSingleThought)
    .put(thoughtController_1.default.updateThought)
    .delete(thoughtController_1.default.deleteThought);
// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(thoughtController_1.default.addReaction);
// /api/thoughts/:thoughtId/reactions/:reactionId
router
    .route("/:thoughtId/reactions/:reactionId")
    .delete(thoughtController_1.default.removeReaction);
exports.default = router;

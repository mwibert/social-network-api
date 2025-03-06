"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const thoughtController_1 = require("../../controllers/thoughtController");
const router = express_1.default.Router();
router
    .route("/")
    .get((req, res) => (0, thoughtController_1.getThoughts)(req, res))
    .post((req, res) => (0, thoughtController_1.createThought)(req, res));
router
    .route("/:thoughtId")
    .get((req, res) => (0, thoughtController_1.getThoughtById)(req, res))
    .put((req, res) => (0, thoughtController_1.updateThought)(req, res))
    .delete((req, res) => (0, thoughtController_1.deleteThought)(req, res));
router
    .route("/:thoughtId/reactions")
    .post((req, res) => (0, thoughtController_1.addReaction)(req, res));
router
    .route("/:thoughtId/reactions/:reactionId")
    .delete((req, res) => (0, thoughtController_1.removeReaction)(req, res));
exports.default = router;

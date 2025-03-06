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
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const thoughtController = {
    getThoughts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thoughts = yield models_1.Thought.find();
                res.json(thoughts);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    getSingleThought(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield models_1.Thought.findById(req.params.thoughtId);
                if (!thought) {
                    res.status(404).json({ message: "No thought with that ID" });
                    return;
                }
                res.json(thought);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    createThought(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield models_1.Thought.create(req.body);
                yield models_1.User.findByIdAndUpdate(req.body.userId, {
                    $push: { thoughts: thought._id },
                });
                res.json(thought);
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    },
    updateThought(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield models_1.Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
                if (!thought) {
                    res.status(404).json({ message: "No thought with that ID" });
                    return;
                }
                res.json(thought);
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    },
    deleteThought(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield models_1.Thought.findByIdAndDelete(req.params.thoughtId);
                if (!thought) {
                    res.status(404).json({ message: "No thought with that ID" });
                    return;
                }
                res.json({ message: "Thought deleted" });
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    addReaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield models_1.Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true, runValidators: true });
                if (!thought) {
                    res.status(404).json({ message: "No thought with that ID" });
                    return;
                }
                res.json(thought);
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    },
    removeReaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const thought = yield models_1.Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
                if (!thought) {
                    res.status(404).json({ message: "No thought with that ID" });
                    return;
                }
                res.json(thought);
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    },
};
exports.default = thoughtController;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Thought_1 = __importDefault(require("../models/Thought"));
const User_1 = __importDefault(require("../models/User"));
// Get all thoughts
const getThoughts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thoughts = yield Thought_1.default.find();
        res.json(thoughts);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});
// Get a single thought by id
const getSingleThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_1.default.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: "No thought with this id!" });
        }
        res.json(thought);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});
// Create a new thought and add it to user's thoughts array
const createThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_1.default.create(req.body);
        // Add thought to the user's thoughts array
        yield User_1.default.findByIdAndUpdate(req.body.userId, { $push: { thoughts: thought._id } }, { new: true });
        res.status(201).json(thought);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});
// Update a thought by id
const updateThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_1.default.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
        if (!thought) {
            return res.status(404).json({ message: "No thought with this id!" });
        }
        res.json(thought);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});
// Delete a thought by id
const deleteThought = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_1.default.findByIdAndDelete(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: "No thought with this id!" });
        }
        // Remove thought from the user's thoughts array
        yield User_1.default.findOneAndUpdate({ username: thought.username }, { $pull: { thoughts: req.params.thoughtId } });
        res.json({ message: "Thought deleted!" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});
// Add a reaction to a thought
const addReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_1.default.findByIdAndUpdate(req.params.thoughtId, {
            $push: {
                reactions: {
                    reactionBody: req.body.reactionBody,
                    username: req.body.username,
                },
            },
        }, { new: true, runValidators: true });
        if (!thought) {
            return res.status(404).json({ message: "No thought with this id!" });
        }
        res.json(thought);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});
// Remove a reaction from a thought
const removeReaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thought = yield Thought_1.default.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
        if (!thought) {
            return res.status(404).json({ message: "No thought with this id!" });
        }
        res.json(thought);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});
// Export an object containing all controller methods
exports.default = {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
};

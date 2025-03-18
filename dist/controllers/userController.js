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
exports.removeFriend = exports.addFriend = exports.deleteUser = exports.updateUser = exports.createUser = exports.getSingleUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const Thought_1 = __importDefault(require("../models/Thought"));
// Get all users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        res.json(users);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.getUsers = getUsers;
// Get a single user by id
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.userId)
            .populate("thoughts")
            .populate("friends");
        if (!user) {
            return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.getSingleUser = getSingleUser;
// Create a new user
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.create(req.body);
        res.status(201).json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.createUser = createUser;
// Update a user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.updateUser = updateUser;
// Delete a user and their thoughts
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "No user with this id!" });
        }
        // BONUS: Remove the user's associated thoughts
        yield Thought_1.default.deleteMany({ username: user.username });
        // Remove the user
        yield User_1.default.findByIdAndDelete(req.params.userId);
        res.json({ message: "User and associated thoughts deleted!" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.deleteUser = deleteUser;
// Add a friend
const addFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.addFriend = addFriend;
// Remove a friend
const removeFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "No user with this id!" });
        }
        res.json(user);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
});
exports.removeFriend = removeFriend;
exports.default = {
    getUsers: exports.getUsers,
    getSingleUser: exports.getSingleUser,
    createUser: exports.createUser,
    updateUser: exports.updateUser,
    deleteUser: exports.deleteUser,
    addFriend: exports.addFriend,
    removeFriend: exports.removeFriend,
};

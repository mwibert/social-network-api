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
const userController = {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield models_1.User.find();
                res.json(users);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    getSingleUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.findById(req.params.userId)
                    .populate("thoughts")
                    .populate("friends");
                if (!user) {
                    res.status(404).json({ message: "No user with that ID" });
                    return;
                }
                res.json(user);
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.create(req.body);
                res.json(user);
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    },
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.findByIdAndUpdate(req.params.userId, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!user) {
                    res.status(404).json({ message: "No user with that ID" });
                    return;
                }
                res.json(user);
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    },
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.findByIdAndDelete(req.params.userId);
                if (!user) {
                    res.status(404).json({ message: "No user with that ID" });
                    return;
                }
                yield models_1.Thought.deleteMany({ _id: { $in: user.thoughts } });
                res.json({ message: "User and associated thoughts deleted" });
            }
            catch (err) {
                res.status(500).json(err);
            }
        });
    },
    addFriend(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } }, { new: true });
                if (!user) {
                    res.status(404).json({ message: "No user with that ID" });
                    return;
                }
                res.json(user);
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    },
    removeFriend(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.User.findByIdAndUpdate(req.params.userId, { $pull: { friends: req.params.friendId } }, { new: true });
                if (!user) {
                    res.status(404).json({ message: "No user with that ID" });
                    return;
                }
                res.json(user);
            }
            catch (err) {
                res.status(400).json(err);
            }
        });
    },
};
exports.default = userController;

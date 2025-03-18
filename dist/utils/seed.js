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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../models/User"));
const Thought_1 = __importDefault(require("../models/Thought"));
dotenv_1.default.config();
const seedData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/socialNetworkDB");
        console.log("Connected to MongoDB");
        // Clear existing data
        yield User_1.default.deleteMany({});
        yield Thought_1.default.deleteMany({});
        // Seed users
        const users = yield User_1.default.insertMany([
            {
                username: "user1",
                email: "user1@example.com",
            },
            {
                username: "user2",
                email: "user2@example.com",
            },
            {
                username: "user3",
                email: "user3@example.com",
            },
        ]);
        // Seed thoughts
        const thoughts = yield Thought_1.default.insertMany([
            {
                thoughtText: "This is a thought from user1",
                username: users[0].username,
            },
            {
                thoughtText: "This is a thought from user2",
                username: users[1].username,
            },
        ]);
        // Update users with thoughts
        yield User_1.default.findByIdAndUpdate(users[0]._id, {
            $push: { thoughts: thoughts[0]._id },
        });
        yield User_1.default.findByIdAndUpdate(users[1]._id, {
            $push: { thoughts: thoughts[1]._id },
        });
        // Add friends
        yield User_1.default.findByIdAndUpdate(users[0]._id, {
            $push: { friends: users[1]._id },
        });
        yield User_1.default.findByIdAndUpdate(users[1]._id, {
            $push: { friends: users[0]._id },
        });
        yield User_1.default.findByIdAndUpdate(users[2]._id, {
            $push: { friends: [users[0]._id, users[1]._id] },
        });
        console.log("Database seeded successfully");
        process.exit(0);
    }
    catch (err) {
        console.error("Error seeding database:", err);
        process.exit(1);
    }
});
seedData();

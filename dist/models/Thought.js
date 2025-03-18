"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Reaction_1 = __importDefault(require("./Reaction"));
// Create the Thought schema using the extended interface
const thoughtSchema = new mongoose_1.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function (value) {
            // Safely transform the date to a string
            return value instanceof Date ? value.toLocaleString() : value;
        },
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [Reaction_1.default],
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});
// Use the merged document type in the virtual
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});
// Export the Thought model typed with IThought
exports.default = (0, mongoose_1.model)("Thought", thoughtSchema);

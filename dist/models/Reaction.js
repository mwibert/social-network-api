"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Create the Reaction schema (this will not be a model, but rather used as a subdocument schema)
const reactionSchema = new mongoose_1.Schema({
    reactionId: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: () => new mongoose_1.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => {
            return timestamp.toLocaleString();
        },
    },
}, {
    toJSON: {
        getters: true,
    },
    id: false,
});
exports.default = reactionSchema;

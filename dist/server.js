"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const api_1 = __importDefault(require("./routes/api")); // Node.js will automatically find index.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.use("/api", api_1.default);
// Connect to MongoDB
mongoose_1.default
    .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/socialNetworkDB")
    .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error("MongoDB connection error:", err);
});
// Add error handling for MongoDB connection
mongoose_1.default.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

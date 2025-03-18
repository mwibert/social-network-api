import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User";
import Thought from "../models/Thought";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/socialNetworkDB"
    );

    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Seed users
    const users = await User.insertMany([
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
    const thoughts = await Thought.insertMany([
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
    await User.findByIdAndUpdate(users[0]._id, {
      $push: { thoughts: thoughts[0]._id },
    });
    await User.findByIdAndUpdate(users[1]._id, {
      $push: { thoughts: thoughts[1]._id },
    });

    // Add friends
    await User.findByIdAndUpdate(users[0]._id, {
      $push: { friends: users[1]._id },
    });
    await User.findByIdAndUpdate(users[1]._id, {
      $push: { friends: users[0]._id },
    });
    await User.findByIdAndUpdate(users[2]._id, {
      $push: { friends: [users[0]._id, users[1]._id] },
    });

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedData();

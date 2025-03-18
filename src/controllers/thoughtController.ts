import { Request, Response } from "express";
import Thought from "../models/Thought";
import User from "../models/User";

// Get all thoughts
const getThoughts = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a single thought by id
const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: "No thought with this id!" });
    }
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new thought and add it to user's thoughts array
const createThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.create(req.body);
    // Add thought to the user's thoughts array
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    res.status(201).json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a thought by id
const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!thought) {
      return res.status(404).json({ message: "No thought with this id!" });
    }
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a thought by id
const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: "No thought with this id!" });
    }
    // Remove thought from the user's thoughts array
    await User.findOneAndUpdate(
      { username: thought.username },
      { $pull: { thoughts: req.params.thoughtId } }
    );
    res.json({ message: "Thought deleted!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a reaction to a thought
const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      {
        $push: {
          reactions: {
            reactionBody: req.body.reactionBody,
            username: req.body.username,
          },
        },
      },
      { new: true, runValidators: true }
    );
    if (!thought) {
      return res.status(404).json({ message: "No thought with this id!" });
    }
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Remove a reaction from a thought
const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: "No thought with this id!" });
    }
    res.json(thought);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Export an object containing all controller methods
export default {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};

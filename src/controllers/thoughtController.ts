import { Request, Response } from "express";
import { Thought, User } from "../models";

const thoughtController = {
  async getThoughts(req: Request, res: Response): Promise<void> {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err: any) {
      res.status(500).json(err);
    }
  },

  async getSingleThought(req: Request, res: Response): Promise<void> {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
        return;
      }
      res.json(thought);
    } catch (err: any) {
      res.status(500).json(err);
    }
  },

  async createThought(req: Request, res: Response): Promise<void> {
    try {
      const thought = await Thought.create(req.body);

      await User.findByIdAndUpdate(req.body.userId, {
        $push: { thoughts: thought._id },
      });
      res.json(thought);
    } catch (err: any) {
      res.status(400).json(err);
    }
  },

  async updateThought(req: Request, res: Response): Promise<void> {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true, runValidators: true }
      );
      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
        return;
      }
      res.json(thought);
    } catch (err: any) {
      res.status(400).json(err);
    }
  },

  async deleteThought(req: Request, res: Response): Promise<void> {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
        return;
      }
      res.json({ message: "Thought deleted" });
    } catch (err: any) {
      res.status(500).json(err);
    }
  },

  async addReaction(req: Request, res: Response): Promise<void> {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
        return;
      }
      res.json(thought);
    } catch (err: any) {
      res.status(400).json(err);
    }
  },

  async removeReaction(req: Request, res: Response): Promise<void> {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!thought) {
        res.status(404).json({ message: "No thought with that ID" });
        return;
      }
      res.json(thought);
    } catch (err: any) {
      res.status(400).json(err);
    }
  },
};

export default thoughtController;

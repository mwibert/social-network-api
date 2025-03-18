import { Schema, Types } from "mongoose";

// Create the Reaction schema (this will not be a model, but rather used as a subdocument schema)
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
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
      get: (timestamp: Date) => {
        return timestamp.toLocaleString();
      },
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

export default reactionSchema;

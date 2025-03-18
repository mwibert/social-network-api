import { Schema, model, Document, Types } from "mongoose";
import reactionSchema from "./Reaction";

// Define a document interface that extends Mongoose's Document
interface IThought extends Document {
  thoughtText: string;
  createdAt: Date;
  username: string;
  // Use a Mongoose DocumentArray type for subdocuments
  reactions: Types.DocumentArray<any>;
}

// Create the Thought schema using the extended interface
const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (value: any) {
        // Safely transform the date to a string
        return value instanceof Date ? value.toLocaleString() : value;
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Use the merged document type in the virtual
thoughtSchema.virtual("reactionCount").get(function (this: IThought) {
  return this.reactions.length;
});

// Export the Thought model typed with IThought
export default model<IThought>("Thought", thoughtSchema);

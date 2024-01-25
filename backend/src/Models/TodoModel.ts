import { model, Schema } from "mongoose";
import {ITodo} from "../types/todo";

const todoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export default model<ITodo>("User", todoSchema);

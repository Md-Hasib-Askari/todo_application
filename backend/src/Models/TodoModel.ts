import { model, Schema } from "mongoose";
import {ITodo} from "../types/todo";
import * as mongoose from "mongoose";

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
    author: {
      type: String,
      required: true,
    }
  },
  { timestamps: true, versionKey: false },
);

export default model<ITodo>("Todo", todoSchema);

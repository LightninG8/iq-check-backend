import { Schema, model } from "mongoose";

const ResultSchema = new Schema({
  email: {

  }
});

export const Result = model('Result', ResultSchema);

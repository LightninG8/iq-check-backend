import { Schema, model } from "mongoose";

const ResultSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: false
  },
  name: {
    type: String,
    required: true
  },
  iq: {
    type: Number,
    required: true
  },
  yearOfBirth: {
    type: Number,
    required: true
  },
  educationType: {
    type: String,
    required: true
  },
  educationLevel: {
    type: String,
    required: true
  }
}, { timestamps: true });

export const ResultModel = model('Result', ResultSchema);

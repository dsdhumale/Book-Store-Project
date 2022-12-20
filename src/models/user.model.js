import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    emailID: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

export default model('User', userSchema);


import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    img: {
      type: String,
    },
    review: {
      type: [String],
    },
    bookmark: {
      type: [String],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);

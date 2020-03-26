import Mongoose from 'mongoose';

const userSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      maxlength: 16
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 32,
      maxlength: 128
    },
    deleted: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true
  }
);

userSchema.index({ name: 1 }, { unique: true });

export interface UserDocument extends Mongoose.Document {
  name: string;
  password: string;
  deleted: boolean;
}

export const User = Mongoose.model<UserDocument>('User', userSchema);

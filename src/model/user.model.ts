import mongoose, { Schema, Document, Types } from "mongoose";

export interface User extends Document {
  email: string;
  username: string;
  name?: string;
  bio?: string;
  image?: string;
  location?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
  posts: Types.ObjectId[];
  comments: Types.ObjectId[];
  likes: Types.ObjectId[];
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  notifications: Types.ObjectId[];
  notificationsCreated: Types.ObjectId[];
}

const UserSchema: Schema<User> = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please use a valid email address"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
    },
    bio: {
      type: String,
    },
    image: {
      type: String,
    },
    location: {
      type: String,
    },
    website: {
      type: String,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Follows",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "Follows",
      },
    ],
    notifications: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
    notificationsCreated: [
      {
        type: Schema.Types.ObjectId,
        ref: "Notification",
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);




const UserModel = mongoose.models.User || mongoose.model<User>("User", UserSchema);
export default UserModel;
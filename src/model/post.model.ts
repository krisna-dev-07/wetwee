import mongoose, { Schema, Document, Types } from "mongoose";
import { User } from "@/model/user.model"; // Import your User interface

export interface Post extends Document {
    content?: string;
    image?: string;
    author: Types.ObjectId | User;
    comments: Types.ObjectId[];
    likes: Types.ObjectId[];
    notifications: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema: Schema<Post> = new Schema(
    {
        content: {
            type: String,
            maxlength: [300, "Post content cannot exceed 300 characters"],
        },
        image: {
            type: String,
            validate: {
                validator: (v: string) => {
                    return /\.(jpe?g|png|gif|bmp|webp)$/i.test(v);
                },
                message: "Invalid image URL format",
            },
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
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
        notifications: [
            {
                type: Schema.Types.ObjectId,
                ref: "Notification",
            },
        ],
    },
    {
        timestamps: true, // Automatically creates createdAt and updatedAt
    }
);
const PostModel = mongoose.models.Post || mongoose.model<Post>("Post", PostSchema);
export default PostModel
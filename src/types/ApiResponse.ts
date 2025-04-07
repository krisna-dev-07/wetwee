import { Post } from "@/model/post.model";
export interface ApiResponse {
    success: boolean;
    message: string;
    messages?:Array<Post> 
}
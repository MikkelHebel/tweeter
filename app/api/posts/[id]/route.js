import { connectToDatabase } from "@utils/database";
import Post from "@models/post";

export const GET = async (req, { params }) => {
    try {
        await connectToDatabase();

        const posts = await Post.findById(params.id).populate('creator');
        if(!posts){
            return new Response("Post not found", { status: 404 });
        }
        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong", { status: 500 });
    }
}

export const PATCH = async (req, { params }) => {
    const { post, tag } = await req.json();

    try {
        await connectToDatabase();

        const existingPost = await Post.findById(params.id);
        if(!existingPost){
            return new Response("Post not found", { status: 404 });
        }

        existingPost.post = post;
        existingPost.tag = tag;
        await existingPost.save();

        return new Response(JSON.stringify(existingPost), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to update the prompt", { status: 500 });
    }
}

export const DELETE = async (req, { params }) => {
    try {
        await connectToDatabase();

        await Post.findByIdAndDelete(params.id);

        return new Response("Post deleted successfully", { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to delete post", { status: 500 });
    }
}
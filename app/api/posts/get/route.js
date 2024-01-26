import { connectToDatabase } from "@utils/database";
import Post from "@models/post";

export const GET = async (req) => {
    try {
        await connectToDatabase();
        
        // Disabling cache
        const posts = await Post.find({}).populate('creator');
        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong", { status: 500 });
    }
}
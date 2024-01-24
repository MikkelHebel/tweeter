import { connectToDatabase } from "@utils/database";
import Post from "@models/post";

export const GET = async (req, { params }) => {
    try {
        await connectToDatabase();

        const posts = await Post.find({creator: params.id}).populate('creator');
        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong", { status: 500 });
    }
}
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDatabase } from '@utils/database';
import User from '@models/user';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],

    callbacks: {
        async session({ session }) {
            const userSession = await User.findOne({ email: session.user.email });
            session.user.id = userSession._id.toString();
    
            return session;
        },
    
        async signIn({ profile }) {
            try {
                await connectToDatabase();
    
                // Check if user exists
                const userExists = await User.findOne({ email: profile.email });
    
                // If user !exists, create user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", ""),
                        image: profile.picture
                    });
    
                    await user.save();
                }
    
                return true;
            } catch (error) {
                console.log(error);
            }
        }
    }
})

export { handler as GET, handler as POST };
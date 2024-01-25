"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';

const UserProfile = ({ params }) => {
    const searchParams = useSearchParams();
    const userName = searchParams.get('name');
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            const res = await fetch(`/api/users/${params.id}/posts`);
            const data = await res.json();

            setUserPosts(data);
        }

        if (params?.id) fetchUserPosts();
    }, [params.id]);

    return (
        <Profile
            name={userName}
            desc={`Welcome to ${userName}'s profile.`}
            data={userPosts}
        />
    );
};

export default UserProfile;
"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/profile';

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
    
      setPosts(data);
    }
    
    if(session?.user.id) fetchPosts();
  }, [])

    const handleEdit = (post) => {
      router.push(`/update-post?id=${post._id}`);
    }

    const handleDelete = async (post) => {
      const hasConfirmed = confirm('Are you sure you want to delete this post?');

      if (hasConfirmed) {
        try {
            const res = await fetch(`/api/posts/${post._id.toString()}`, {
                method: 'DELETE'
            });

            const filteredPosts = posts.filter((p) => p._id !== p._id);
            setPosts(filteredPosts);

            router.push('/');
        } catch (error) {
            console.log(error);
        }
      }
    }

  return (
    <Profile
        name="My"
        desc="This is my profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile
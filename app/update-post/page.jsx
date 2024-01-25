"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';

const EditPost = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const postId = router.query && router.query.id; // Check if router.query is defined before accessing id
  const [post, setPost] = useState({
    post: '',
    tag: '',
  });

  useEffect(() => {
    const getPostDetails = async () => {
        const res = await fetch(`/api/posts/${postId}`);
        const data = await res.json();
    
        setPost({
            post: data.post,
            tag: data.tag,
        });
    }

    if(postId) getPostDetails();
  }, [postId])
  

  const editPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if(!postId) return alert('Something went wrong! Post ID not found.');

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          post: post.post,
          tag: post.tag
        }),
      });

      if(response.ok) {
        router.push('/profile');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPost}
    />
  );
};

export default EditPost
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PostCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  if (!post.creator || !post.creator.image) {
    return null;
  }
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.post);
    navigator.clipboard.writeText(post.post);
    setTimeout(() => setCopied(""), 2500);
  }

  return (
    <div className="post_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="Profile picture"
            width={40}
            height={40}
            className="rounded-full"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.username}</h3>
            <h3 className="font-inter text-sm text-gray-500">{post.creator.email}</h3>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied === post.post ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            alt="Copy link"
            width={20}
            height={20}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.post}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={() => handleClick && handleTagClick(post.tag)}>{post.tag}</p>
    </div>
  );
};

export default PostCard;

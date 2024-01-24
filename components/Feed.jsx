'use client';

import { useState, useEffect } from 'react';
import PostCard from '@components/PostCard';

const PostCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 post_layout">
      {data.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts/get');
      const data = await res.json();

      setPosts(data);
    }

    fetchPosts();
  }, [])
  

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search anything" value={searchText} onChange={handleSearchChange} required className="search_input peer" />
      </form>

      <PostCardList
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed
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
  const [posts, setPosts] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const fetchPosts = async () => {
    const res = await fetch('/api/posts/get', { next: { revalidate: 10 }});
    const data = await res.json();

    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPosts = (searchtext) => {
    const regex = new RegExp(searchtext, 'i');
    return posts.filter(
      (post) =>
      regex.test(post.creator.username) ||
      regex.test(post.tag) ||
      regex.test(post.title)
  )};

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(() => {
      const searchResult = filterPosts(e.target.value);
      setSearchResults(searchResult);
    }, 500)
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);

    const searchResult = filterPosts(tag);
    setSearchResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input type="text" placeholder="Search anything..." value={searchText} onChange={handleSearchChange} required className="search_input peer" />
      </form>

      {searchText ? (
        <PostCardList
          data={searchResults}
          handleTagClick={() => {}}
        />
      ) : (
        <PostCardList
          data={posts}
          handleTagClick={handleTagClick}
        />
      )}
    </section>
  )
}

export default Feed
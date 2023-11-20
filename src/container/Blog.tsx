import './Blog.css';
import {useCallback, useEffect, useState} from 'react';
import {ApiPost, ApiUser, BlogPosts} from '../types';
import PostCard from '../components/Post/PostCard.tsx';
import PostForm from '../components/PostForm/PostForm.tsx';
import axios from 'axios';
import FullPost from '../components/Post/FullPost.tsx';

const BASE_URL = 'https://jsonplaceholder.typicode.com/';
const POSTS_URL = BASE_URL + 'posts?_limit=4';
const USER_URL = BASE_URL + 'users/';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPosts[]>([
    {title: 'Test post', author: 'John Doe', id: 1},
    {title: 'Hello, world', author: 'Jack Black', id: 2},
    {title: 'Another post', author: 'Main Editor', id: 3},
  ]);
  const [showPostForm, setShowPostForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const togglePostsForm = () => setShowPostForm((prev) => !prev);
  
  //UseEffect
  console.log('[Blog] render');
  useEffect(() => {
    console.log('[Blog] mounted/updated');
  });
  
  useEffect(() => {
    console.log('[Posts] changed');
  }, [posts]);
  
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const postsResponse = await axios.get<ApiPost[]>(POSTS_URL);
      
      const promises = postsResponse.data.map(async (post) => {
        const userUrl = USER_URL + post.userId;
        const userResponse = await axios.get<ApiUser>(userUrl);
        
        return {
          id: post.id,
          title: post.title,
          author: userResponse.data.name,
        };
      });
      
      const newPost = await Promise.all(promises);
      setPosts(newPost);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
     void fetchData();
  }, [fetchData]);
  
  
  //Container
  let postsForm = null;
  
  if (showPostForm) {
    postsForm = (
      <PostForm/>
    );
  }
  
  return (
    <>
      <section className="Posts">
        {loading && (
          <h1>Loading!</h1>
        )}
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            author={post.author}
            onClick={() => setSelectedPostId(post.id)}
          />
        ))}
        {postsForm}
      </section>
      <div>
        <button onClick={togglePostsForm}>New post</button>
      </div>
      <section>
        <FullPost
          id={selectedPostId}
        />
      </section>
    </>
  );
};

export default Blog;
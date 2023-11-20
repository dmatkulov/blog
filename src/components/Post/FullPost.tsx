import React, {useCallback, useEffect, useState} from 'react';
import './FullPost.css';
import {ApiPost} from '../../types';
import axios from 'axios';

const POST_URL = 'https://jsonplaceholder.typicode.com/posts/';
interface Props {
  id: number | null;
}
const FullPost: React.FC<Props> = ({id}) => {
  const [post, setPost] = useState<ApiPost | null>(null);
  
  const fetchPost = useCallback(async () => {
    if (id !== null) {
      const postResponse = await axios.get<ApiPost>(POST_URL + id);
      setPost(postResponse.data);
    }
  }, [id]);
  
  useEffect(() => {
    void fetchPost();
  }, [fetchPost]);
  
  return post && (
    <div className="FullPost">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <div className="Edit">
        <button className="Delete">Delete</button>
      </div>
    </div>
  );
};

export default FullPost;
import {useEffect} from 'react';

const PostForm = () => {
  useEffect(() => {
    console.log('[PostsForm] in useEffect');
    
    return () => {
      console.log('[PostsForm] unmounted');
    };
  });
  
  return (
    <section className="NewPost">
      <p>New post will be here</p>
    </section>
  );
};

export default PostForm;
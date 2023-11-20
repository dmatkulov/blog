import React, {useEffect} from 'react';
import './PostCard.css';

interface Props {
  title: string;
  author: string;
  onClick: React.MouseEventHandler;
}

const PostCard: React.FC<Props> = React.memo(function PostCard({title, author, onClick}) {
  console.log('[PostCard] render');
  
  useEffect(() => {
    console.log('[PostCard] mounted/updated');
  });
  
  return (
    <article
      className="PostCard"
      onClick={onClick}
    >
      <h1>{title}</h1>
      <div className="Info">
        <div className="Author">{author}</div>
      </div>
    </article>
  );
}, (prevProps, nextProps) => {
  return prevProps.title === nextProps.title && prevProps.author === nextProps.author;
});

export default PostCard;
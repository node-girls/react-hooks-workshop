import React from 'react';
import CardPosts from './CardPosts';

const Body = ({step, posts}) => (
  <>
  <h2>Body in step {step}</h2>
  { step === 1 
    && posts.map((post, index) => <CardPosts key={post.id} post={post}/>)}
  </>
);

export default Body;
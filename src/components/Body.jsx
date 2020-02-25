import React from 'react';
import CardPosts from './CardPosts';
import CardFilter from './CardFilters';
import filters from '../data/filters';

const Body = ({step, posts, image}) => (
  <>
  <h2>Body in step {step}</h2>
  { step === 1 
    && posts.map((post, index) => <CardPosts key={post.id} post={post}/>)}
  { step === 2
    && filters.map((filter => <CardFilter key={filter.name} image={image} filter={filter} setFilter={console.log}/>))}
  </>
);

export default Body;
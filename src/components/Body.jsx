import React from 'react';
import CardPosts from './CardPosts';
import CardFilter from './CardFilters';
import filters from '../data/filters';

const Body = ({step, posts, image, setFilter, setCaption, handleLikes}) => (
  <>
  { step === 1 
    && posts.map((post, index) => <CardPosts key={post.id} post={post} handleLikes={handleLikes}/>)}
  { step === 2
    && filters.map((filter => <CardFilter key={filter.name} image={image} filter={filter} setFilter={setFilter}/>))}
  { step === 3
    &&  
      <>
        <div className="selected-image">
          <img src={image} alt=""/>
        </div>
        <div className="caption-containe">
          <textarea 
            className="caption-input"
            type="text"
            placeholder="Write a caption..."
            onChange={(ev) => setCaption(ev.target.value)}
            ></textarea>
        </div>
      </>
    }
  </>
);

export default Body;
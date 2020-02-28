import React from 'react';
import CardPosts from './CardPosts';
import CardFilter from './CardFilters';
import filters from '../data/filters';

const Body = ({ step, posts, image, filter, setFilter, setCaption, handleLikes }) => (
  <main>
    {step === 1
      && <div className="posts">{posts.map((post, index) => <CardPosts key={post.id} post={post} handleLikes={handleLikes} />)}</div>}
    {step === 2
      && <div className="filter-container">{filters.map((filter => <CardFilter key={filter.name} image={image} filter={filter} setFilter={setFilter} />))}</div>}
    {step === 3
      &&
      <>
        <div className="selected-image">
          <div className={filter}>
            <img className="img" src={image} alt="" />
          </div>
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
  </main>
);

export default Body;
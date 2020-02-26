import React from 'react';

const CardPosts = ({ post, handleLikes }) => (
  <article>
    <div>
      <img src={post.userImage} alt={post.username} />
      <p>{post.username}</p>
    </div>
    <div>
      <img src={post.postImage} alt="" />
      <div>
        <button onClick={() => handleLikes(post)}>
          <i className="far fa-heart fa-lg"></i>
        </button>
        <p>{post.likes}</p>
        <p>{post.caption}</p>
      </div>
    </div>
  </article>
)

export default CardPosts;
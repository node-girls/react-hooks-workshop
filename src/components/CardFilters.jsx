import React from 'react';

const CardFilter = ({filter, image, setFilter}) => (
  <div className={filter.name}>
    <p>{filter.name}</p>
    <div
      className="img"
      id={filter.name}
      onClick={() => setFilter(filter.name)}>
        <img src={image} alt="" />
    </div>
  </div>
);

export default CardFilter;
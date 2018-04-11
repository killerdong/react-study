import React from 'react';
import StarRating from './StarRating_func';

export default ({title, color, rating = 0, onRemove=f=>f, onRate=f=>f}) => 
    <section className="color">
        <h1>{title}</h1>
        <button onClick={onRemove}>X</button>
        <div className="color" style={{backgroundColor: color, width: "200px", height: "200px"}}></div>
        <StarRating startsSelected={rating} onRate={onRate} />
    </section>
;
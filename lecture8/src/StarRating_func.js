import React from 'react';
import Star from './Star';

export default ({startsSelected=0, totalStars=5, onRate= f=>f}) => 
    <div className="star-rating">
        {[...Array(totalStars)].map((n, i) => <Star key={i} selected={i < startsSelected} onClick={() => onRate(i+1)} />)}
        <p>별점: {startsSelected} / {totalStars}</p>
    </div>;

import React from 'react';

export default ({email, picture, name, location}) => (
    <div className="member">
        <img src={picture.thumbnail} alt="" />
        <h1>{name.first} {name.last}</h1>
        <p><a href="">{email}</a></p>
    </div>
);

import React from 'react';
import {NavLink} from 'react-router-dom';

const selectedStyle = {
    backgroundColor: 'white',
    color: 'slategray'
};

export default () => 
    <div className="main-menu">
        <NavLink to="/">[HOME]</NavLink>
        <NavLink to="/about" activeStyle={selectedStyle}>[회사 소개]</NavLink>
        <NavLink to="/events" activeStyle={selectedStyle}>[이벤트]</NavLink>
        <NavLink to="/products" activeStyle={selectedStyle}>[제품]</NavLink>
        <NavLink to="/contact" activeStyle={selectedStyle}>[고객 지원]</NavLink>
    </div>;

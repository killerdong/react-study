import React from 'react';
import {NavLink} from 'react-router-dom';

const selectedStyle = {
    backgroundColor: 'white',
    color: 'slategray'
};

export default ({match}) => 
    <div className="about-menu">
        <NavLink to="/about" style={match.isExact && selectedStyle}>[회사]</NavLink>
        <NavLink to="/about/history" activeStyle={selectedStyle}>[연혁]</NavLink>
        <NavLink to="/about/services" activeStyle={selectedStyle}>[서비스]</NavLink>
        <NavLink to="/about/location" activeStyle={selectedStyle}>[위치]</NavLink>
    </div>;

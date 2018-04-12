import React from 'react';

export default ({selected=false, onClick=f=>f}) => <div className={ (selected) ? "star selected" : "star"} onClick={onClick}></div>;
    
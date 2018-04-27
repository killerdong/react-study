import React from 'react';
import MainMenu from './MainMenu';

export default ({children}) => 
    <div className="">
        <MainMenu />
        {children}
    </div>;
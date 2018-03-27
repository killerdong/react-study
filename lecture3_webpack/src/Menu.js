import Recipe from './Recipe';
import React from 'react';

const Menu = ({title, recipes}) => 
    <article>
        <header>{title}</header>
        <div className='recipes'>
            {recipes.map((recipe, idx) => <Recipe key={idx} {...recipe} />)}
        </div>
    </article>;

export default Menu;
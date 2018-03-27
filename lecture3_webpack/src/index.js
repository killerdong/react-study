import React from 'react';
import {render} from 'react-dom';
import Menu from './Menu';
import data from './data/recipes.json';

render(<Menu recipes={data} />, document.getElementById("react-container"));


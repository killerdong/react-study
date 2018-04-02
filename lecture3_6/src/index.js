import React from 'react';
import {render} from 'react-dom';
import Summary from './Summary';

render(<Summary 
    title="땅콩버터와 젤리"
    ingredients={6}
    steps={1} />, document.getElementById("root"));

// render(<Summary />, document.getElementById("root"));

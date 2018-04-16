import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

let users =  [{
    id: 0,
    name: "서동우",
    phone: "01094610964",
    email: "sdw1211@gmail.com"
  }, {
    id: 1,
    name: "하하하",
    phone: "01094610964",
    email: "killerdong@gmail.com"
  }];

ReactDOM.render(<App users={users} />, document.getElementById('root'))

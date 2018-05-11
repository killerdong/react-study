import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Reducer  from './reducer';

const store = createStore(Reducer, {todos: []});
console.log(store.getState());

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>    
    , document.getElementById('root'));
registerServiceWorker();

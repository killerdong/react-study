import React from 'react';
import ReactDOM from 'react-dom';
// import AddColorForm from './AddColorForm';
// import StartRating from './StarRating';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

// ReactDOM.render(<AddColorForm onNewColor={(title, color) => {
//     console.log(`TODO: 새로운 색 정보 ${title}과 ${color}를 리스트에 넣는다.`);
//     console.log(`TODO: 새로운 색을 가지고 UI를 표시한다.`);
// }} />, document.getElementById('root'));

//ReactDOM.render(<StartRating totalStars={10} />, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();

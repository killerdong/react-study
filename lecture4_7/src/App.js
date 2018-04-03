import React from 'react';
import MemberList from './MemberList';
import './App.css';

const App = ({unmount}) => {
  return (
    <React.Fragment>
      <button onClick={unmount}>노드 삭제</button>
      <MemberList count="10" />
    </React.Fragment>
  );
}

export default App;

import React, { Component } from 'react';
import { Input, Todos } from './components';

import {TodosContext} from './context/Todos';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  clickEventHandler(name) {
    this.setState({
      todos: [...this.state.todos, {id: this.state.todos.length + 1, name}]
    });
  }

  render() {
    return (
        <TodosContext.Provider value={{
          todos: this.state.todos,
          clickEventHandler: this.clickEventHandler.bind(this)
        }}>
        <div className="App">
            <Input />
            <Todos />
        </div>
        </TodosContext.Provider>
    );
  }
}

export default App;

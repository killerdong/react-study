import React from 'react';
import Todo from './Todo';

import {TodosContext} from '../context/Todos';

export default () => 
    <ul>
        <TodosContext.Consumer>
        {({todos}) => todos.map(todo => <Todo key={todo.id} {...todo} />)}
        </TodosContext.Consumer>
    </ul>;


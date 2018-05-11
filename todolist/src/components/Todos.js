import React from 'react';
import Todo from './Todo';

//import { TodosContext } from '../context/Todos';


export default ({todos}) => 
        <ul>
            {todos.map(todo => <Todo key={todo.id} {...todo} />)}
        </ul>;


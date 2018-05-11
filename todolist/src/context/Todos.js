import React from 'react';

export const todos = [];

export const TodosContext = React.createContext({
    todos,
    clickEventHandler: () => {}
});
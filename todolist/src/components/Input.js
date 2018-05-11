import React, {Fragment} from 'react';
//import { TodosContext } from '../context/Todos';

export default props => {
    let todo;

    // return (<Fragment>
    //     <input type="text" placeholder="할일을 입력하세요." ref={input => todo = input}  />
    //     <TodosContext.Consumer>
    //         {todos => <button onClick={clickEventHandler(todos)}>등록하기</button>}
    //     </TodosContext.Consumer>
    // </Fragment>);

    return (<Fragment>
        <input type="text" placeholder="할일을 입력하세요." ref={input => todo = input}  />
        <button onClick={e => props.addTodos(todo.value)}>등록하기</button>
    </Fragment>);

};

import React, {Fragment} from 'react';

import {TodosContext} from '../context/Todos';

export default () => {
    let todo;

    const keyDown = (e, eventHandler) => {
        if (e.keyCode === 13) {
            eventHandler(todo.value);
        }
    }

    return (<Fragment>
        <TodosContext.Consumer>
            {({clickEventHandler}) =>
                <Fragment>
                    <input type="text" placeholder="할일을 입력하세요." ref={input => todo = input} onKeyDown={e => keyDown(e, clickEventHandler)} />
                    <button onClick={e => clickEventHandler(todo.value)}>등록하기</button>
                </Fragment>}
        </TodosContext.Consumer>
    </Fragment>);

};

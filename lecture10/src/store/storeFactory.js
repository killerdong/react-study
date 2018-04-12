import { createStore, combineReducers, applyMiddleware } from 'redux';
import colors from '../reducers/colorsReducer';
import sort from '../reducers/sortReducers';

const logger = store => next => action => {
    let result;

    console.groupCollapsed('디스패칭', action.type);
    console.log('이전상태', store.getState());
    console.log('액션', action);
    result = next(action);
    console.log('다음상태', store.getState());
    console.groupEnd();
    return result;
};

const saver = store => next => action => {

    let result = next(action);
    return result;
}

export default (initialState = {})  => applyMiddleware(logger, saver)(createStore)(combineReducers({colors, sort}), initialState);


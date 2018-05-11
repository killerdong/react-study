import { todoReducer } from './TodoReducer';
import { combineReducers } from 'redux';
console.log(todoReducer);
export default combineReducers({todoReducer});
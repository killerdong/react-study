import { addTodo, ADD_TODO } from '../actions';
 
export const todoReducer = (state = {todos:[]}, action) => {
    switch(action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, {
                    id: state.todos.reduce((pre, cur) => cur.id > pre ? cur.id : pre ,0) + 1,
                    name: action.payload.name
                }]
            };
        default:
            return state;
    }
};

export const mapStateToProps = ({todoReducer}) => (todoReducer);

export const mapDispatchToProps = dispatch  => ({
    addTodos: name => dispatch(addTodo(name))
});

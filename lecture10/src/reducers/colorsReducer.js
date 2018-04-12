import costants from '../actions/constants';
import color from './colorReducer';

export default (state=[], action) => {
    switch(action.type) {
        case costants.ADD_COLORS: 
            return [...state, color({}, action)];
        case costants.RATE_COLORS:
            return state.map(c => color(c, action));
        case costants.REMOVE_COLORS:
            return state.filter(c => c.id !== action.payload.id);
        default:
            return state;
    }
};
import costants from '../actions/constants';

export default (state='SORTED_BY_DATE', action) => {
    switch(action.type) {
        case costants.SORT_COLORS: 
            return action.playload.sortBy;
        default:
            return state;
    }
}
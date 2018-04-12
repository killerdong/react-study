import costants from '../actions/constants';

// export default (state={}, action) => state;

// export default (state={}, action) => {
//     switch(action.type) {
//         case costants.ADD_COLORS: 
//             return {
//                 ...action.payload,
//                 rating: 0
//             };
//         case costants.RATE_COLORS:
//             state.rating = action.payload.rating;
//             return state;
//         default:
//             return state;
//     }
// };

export default (state={}, action) => {
    switch(action.type) {
        case costants.ADD_COLORS: 
            return {
                ...action.payload,
                rating: 0
            };
        case costants.RATE_COLORS:
            return action.payload.id === state.id ? {
                ...state,
                rating: action.payload.rating
            } : state;
        default:
            return state;
    }
};
import C from './actions/constants';
import colorReducer from './reducers/colorReducer';
import deepFreeze from 'deep-freeze';

describe('color 리듀서', () => {
    it('ADD_COLOR 성공', () => {
        const state = {};
        const action = {
            type: C.ADD_COLORS,
            payload: {
                id: 0,
                title: 'Test Teal',
                color: '#90c3d4',
                timestamp: new Date().toString()
            } 
        };

        deepFreeze(state);
        deepFreeze(action);

        const results = colorReducer(state, action);
        expect(results).toEqual({
            id: 0,
            title: 'Test Teal',
            color: '#90c3d4',
            timestamp: action.payload.timestamp,
            rating: 0
        });
    });

    it('RATE_COLOR 성공', () => {
        const state = {
            id: 0,
            title: 'Test Teal',
            color: '#90c3d4',
            timestamp: new Date().toString(),
            rating: 0
        };

        const action = {
            type: C.RATE_COLORS,
            payload: {
                id: 0,
                rating: 3
            } 
        };

        deepFreeze(state);
        deepFreeze(action);

        const results = colorReducer(state, action);
        expect(results.rating).toBe(3);
    });
});

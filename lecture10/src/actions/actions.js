import {v4} from 'uuid';
import costants from './constants';

const removeColor = id => ({
    type: costants.REMOVE_COLORS,
    payload: {
        id
    }
});

const rateColor = (id, rate) => ({
    type: costants.RATE_COLORS,
    payload: {
        id,
        rate
    }
});

const addColor = (title, color) => ({
    type: costants.ADD_COLORS,
    payload: {
        id: v4(),
        title, 
        color,
        timestamp: new Date().toString()
    }
});

export {removeColor, rateColor, addColor};
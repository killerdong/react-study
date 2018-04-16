import C from './actions/constants';
import storeFactory from './store/storeFactory';
import { addColor } from './actions/actions';

describe('addColor', () => {
    let store;

    const colors = [
        {
            "id": "8658c1d0-9eda-4a90-95e1-8001e8eb6036",
            "title": "바닷빛 파랑",
            "color": "#0070ff",
            "rating": 3,
            "timestamp": "Sat Mar 12 2016 16:12:09 GMT-0800 (PST)"
        },        
        {
            "id": "8658c1d0-9eda-4a90-95e1-8001e8eb6038",
            "title": "토마토",
            "color": "#d10012",
            "rating": 2,
            "timestamp": "Fri Mar 11 2016 16:12:09 GMT-0800 (PST)"
        }
    ];

    beforeAll(() => {
        store = storeFactory({colors});
        store.dispatch(addColor('어두운 파랑', '#000033'));
    });

    it("should add a new color", () => expect(store.getState().colors.length).toBe(2));
    it("should add a unigue guid id", () => expect(store.getState().colors[2].id.length).toBe(36));
    it("should set the rating to 0", () => expect(store.getState().colors[2].rating).toBe(0));
    //toBeDefined는 해당 값이 설정되어 있는 경우
    it("should set timestamp", () => expect(store.getState().colors[2].timestamp).toBeDefined());
});

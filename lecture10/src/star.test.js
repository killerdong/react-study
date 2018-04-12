import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Star from './components/ui/star';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });

describe('Star UI Component', () => {
    it('renders default star', () => {
        expect(
            shallow(<Star />)
            .find('div.star')
            .length
        ).toBe(1);
    }); 

    it('renders selected stars', () => {
        expect(
            shallow(<Star selected={true} />)
            .find('div.star.selected')
            .length
        ).toBe(1);
    });

    it('invoke onClick', () => {

        const _click = jest.fn();

        const div = shallow(<Star onClick={_click} />)
        .find('div.star').first();
        div.simulate('click'); 
 
        expect(_click).toBeCalled();
    });
    
})
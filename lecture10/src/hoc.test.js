import { configure, mount } from 'enzyme';
import Expandable from './components/hoc/Expandable';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

configure({ adapter: new Adapter() });

describe('Expandable Higher-Order Component', () => {
    let props,
        wrapper,
        ComposedComponent,
        MockComponent = ({collapsed, expandCollapes}) => <div onClick={expandCollapes}>{collapsed ? 'collapsed' : 'expanded'}</div>;

    describe('Rendering UI', () => {
        beforeAll(() => {
            ComposedComponent = Expandable(MockComponent);
            wrapper = mount(<ComposedComponent foo='foo' bar='bar' hidden={true} />);
            props = wrapper.find(MockComponent).props();
        }); 

        it('Starts off collapsed', () =>  expect(props.collapsed).toBe(true));
        it('passes the expandCollapse function to composed component', () =>  expect(typeof props.expandCollapes).toBe('function'));
        it('passes additional foo prop to composed component', () =>  expect(props.foo).toBe('foo'));
        it('passes additional foo prop to composed component', () =>  expect(props.bar).toBe('bar'));
    });

    describe('Expand Collapse Functionality', () => {
        let instance;

        beforeAll(() => {
            ComposedComponent = Expandable(MockComponent);
            wrapper = mount(<ComposedComponent collapsed={false} />);
            instance = wrapper.instance();
        });

        it('renders the MockComponent as the root element', () =>  {
            expect(wrapper.find('div').is('div')).toBeTruthy();
        });
        it('starts off expanded', () =>  expect(instance.state.collapsed).toBeFalsy());
        it('toggles the collapsed state', () =>  {
            instance.expandCollapes();
            expect(instance.state.collapsed).toBeTruthy();
        });
    });
});
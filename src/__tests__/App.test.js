import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';

describe('<App /> component', () => { // describe() function groups tests together
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />); // shallow rendering
    });

    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1); // check if EventList component is rendered
    });

    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });

    
});
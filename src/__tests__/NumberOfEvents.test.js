import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../App/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />);
    });

    test('render number of events', () => {
        expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
    });

    test('render number of events input', () => {
        expect(NumberOfEventsWrapper.find('.number-of-events-input')).toHaveLength(
            1
        );
    });

    test('render number of events label', () => {
        expect(NumberOfEventsWrapper.find('.number-of-events-label')).toHaveLength(
            1
        );
    });

    test('render number of events input correctly', () => {
        const numberOfEvents = NumberOfEventsWrapper.state('query');
        expect(
            NumberOfEventsWrapper.find('.number-of-events-input').prop('value')
        ).toBe(numberOfEvents);
    });

    test('change state when number of events input changes', () => {
        expect(NumberOfEventsWrapper.state('query')).toBe(32);
        NumberOfEventsWrapper.find('.number-of-events-input').simulate('change', {
            target: { value: 10 },
        });
        expect(NumberOfEventsWrapper.state('query')).toBe(10);
    });
});



import { loadFeature, defineFeature } from "jest-cucumber";
import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App/App';
import { mockData } from '../mock-data';
import NumberOfEvents from '../App/NumberOfEvents';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
    test(`When user hasn't specified number of events, 32 events are displayed by default`, ({ given, when, then }) => {
    	given(`user hasn't specified number of events`, () => {
    	});
        let AppWrapper;
    	when('user opens the app', async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.update();
    	});

    	then('32 events are displayed by default', () => {
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    	});
    });

    test('User can change the number of events they want to see', ({ given, when, then }) => {
        let AppWrapper;
    	given('user opens the app', () => {
            AppWrapper = mount(<App />);
            AppWrapper.update();
    	});
        let NumberOfEventsWrapper;
    	when('user changes the number of events they want to see', () => {
            NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
            NumberOfEventsWrapper.setState({ numberOfEvents: 1 });
    	});

    	then('the number of events displayed changes to the number specified by the user', () => {
            const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
            expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(1);
    	});
    });
});


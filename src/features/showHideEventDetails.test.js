import { loadFeature, defineFeature } from "jest-cucumber";
import React from 'react';
import { mount } from 'enzyme';
import App from '../App/App';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, (test) => {
    test('An event element is collapsed by default', ({ given, when, then }) => {
    	given('the user hasn’t clicked on anything', () => {
    	});
        let AppWrapper;
    	when('the user opens the app', async () => {
            AppWrapper = await mount(<App />);
    	});

    	then('the user should see a list of events with limited details.', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
    	});
    });

    test('User can expand an event to see its details', ({ given, when, then }) => {
        let AppWrapper;
    	given('the user was viewing a list of events', async () => { 
            AppWrapper = await mount(<App />);
    	});

    	when('the user clicks on an event', () => {
            AppWrapper.update();
            AppWrapper.find('.event .details-btn').at(0).simulate('click');
    	});

    	then('the user should see the event details', () => {
            expect(AppWrapper.find('.event .event-details')).toHaveLength(1);
    	});
    });

    test('User can collapse an event to hide its details', ({ given, when, then }) => {
        let AppWrapper;
    	given('the user was viewing an event', async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.update();
            AppWrapper.find('.event .details-btn').at(0).simulate('click');
            expect(AppWrapper.find('.event-details').at(0)).toHaveLength(1);
    	});

    	when('the user clicks on the event', () => {
            AppWrapper.find('.event .details-btn').at(0).simulate('click');
    	});

    	then('the user should see the list of events', () => {
            expect(AppWrapper.find('.event .event-details')).toHaveLength(0);
    	});
    });
});
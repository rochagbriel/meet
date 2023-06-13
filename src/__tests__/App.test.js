import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App/App';
import EventList from '../App/EventList';
import CitySearch from '../App/CitySearch';
import NumberOfEvents from '../App/NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

// Unit tests

describe('<App /> component', () => {
    // describe() function groups tests together
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />); // shallow rendering
    });

    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1); // check if EventList component is rendered
    });

    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1); // check if CitySearch component is rendered
    });

    test('render NumberOfEvents', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1); // check if NumberOfEvents component is rendered
    });
});

// Integration tests

describe('<App /> integration', () => {
    test('App passes "events" state as a prop to EventList', () => {
        const AppWrapper = mount(<App />); // full DOM rendering
        const AppEventsState = AppWrapper.state('events');
        expect(AppEventsState).not.toEqual(undefined); // check if events state is defined
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState); // check if events state is passed as a prop to EventList
        AppWrapper.unmount();
    });

    test('App passes "locations" state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />); // full DOM rendering
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined); // check if locations state is defined
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(
            AppLocationsState
        ); // check if locations state is passed as a prop to CitySearch
        AppWrapper.unmount();
    });

    test('get list of events matching the city selected by the user', async () => {
        const AppWrapper = mount(<App />); // full DOM rendering
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        const selectedIndex = Math.floor(Math.random() * suggestions.length);
        const selectedCity = suggestions[selectedIndex];
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(
            (event) => event.location === selectedCity
        );
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    });

    test('get list of all events when user selects "See all cities"', async () => {
        const AppWrapper = mount(<App />); // full DOM rendering
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    });
});

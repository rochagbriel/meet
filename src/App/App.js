import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents, checkToken, getAccessToken } from '../api';
import logo from '../img/logo.png';
import '../nprogress.css';
import { WarningAlert } from '../components/Alert';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all',
    warningText: '',
    showWecomeScreen: undefined
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events,
          locations: extractLocations(events),
        });
      }
    });
  }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  

  updateEvents = (location, eventCount) => {
    const { currentLocation } = this.state;
    if (location) {
    getEvents().then((events) => {
      const locationEvents =
        location === 'all'
          ? events
          : events.filter((event) => event.location === location);
      const eventsToShow = locationEvents.slice(0, eventCount);
      this.setState({
        events: eventsToShow,
        currentLocation: location,
        numberOfEvents: eventCount,
      });
    });
  } else {
    getEvents().then((events) => {
      const locationEvents = (currentLocation === 'all') 
      ? events
      : events.filter((event) => event.location === currentLocation);
      const eventsToShow = locationEvents.slice(0, eventCount);
      this.setState({
        events: eventsToShow,
        numberOfEvents: eventCount,
      });
    });
  }
  if (!navigator.onLine) {
    this.setState({
      warningText: 'You are currently offline. Events displayed may not be up-to-date.'
    });
  }
  else {
    this.setState({
      warningText: ''
    });
  }
};



  render() {
    const { events } = this.state;
    const eventsToShow = events.length > 32 ? events.slice(0, this.state.numberOfEvents) : events;
    if (this.state.showWelcomeScreen === undefined) return <div className='App' />

    return (
      <div className='App'>
        <WarningAlert text={this.state.warningText} />
        <img src={logo} className='logo' alt='logo' />
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEvents={this.updateEvents} />
        <EventList events={eventsToShow} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;

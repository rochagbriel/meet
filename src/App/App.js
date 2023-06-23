import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import {
  extractLocations,
  getEvents,
  checkToken,
  getAccessToken,
} from '../api';
import logo from '../img/logo.png';
import '../nprogress.css';
import { WarningAlert } from '../components/Alert';
import WelcomeScreen from './WelcomeScreen';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import EventGenre from '../components/EventGenre';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all',
    warningText: '',
    showWecomeScreen: undefined,
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
        const locationEvents =
          currentLocation === 'all'
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
        warningText:
          'You are currently offline. Events displayed may not be up-to-date.',
      });
    } else {
      this.setState({
        warningText: '',
      });
    }
  };

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(', ').shift();
      return { city, number };
    });
    return data;
  };

  render() {
    const { events } = this.state;
    const eventsToShow =
      events.length > 32 ? events.slice(0, this.state.numberOfEvents) : events;
    if (this.state.showWelcomeScreen === undefined)
      return <div className='App' />;

    return (
      <div className='App'>
        <WarningAlert text={this.state.warningText} />
        <img src={logo} className='logo' alt='logo' />
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateEvents={this.updateEvents}
        />
        {this.state.currentLocation === 'all' ? (
          <>
            <h4 className='chart-title'>Events in each city:</h4>
            <div className='data-vis-wrapper'>
              <EventGenre className='pizza-chart' events={events} />
              <ResponsiveContainer className='chart' height={400}>
                <ScatterChart
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid />
                  <XAxis dataKey='city' type='category' name='city' />
                  <YAxis
                    dataKey='number'
                    type='number'
                    name='number of events'
                    allowDecimals={false}
                  />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter data={this.getData()} fill='#ed684f' />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : null}
        <EventList events={eventsToShow} />
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;

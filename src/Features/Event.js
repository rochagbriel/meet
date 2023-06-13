import React, { Component } from 'react';

class Event extends Component {
  state = { showDetails: false };
  handleShowDetails = () => {
    this.setState((prevState) => ({
      showDetails: !prevState.showDetails,
    }));
  };

  render() {
    const { event } = this.props;
    const { showDetails } = this.state;

    return (
      <div className='event'>
        <h1 className='summary'>{event.summary}</h1>
        <p className='event-start'>
          {new Date(event.start.dateTime).toString()}
        </p>
        <p className='event-location'>
          {`@${event.summary} | ${event.location}`}
        </p>

        {showDetails && (
          <div className='event-details'>
            <h2>About event:</h2>
            <a className='event-link' href='{event.htmlLink}' target='_blank'>
              See details on Google Calendar
            </a>
            <p className='event-description'>{event.description}</p>
          </div>
        )}

        <button
          className='details-btn'
          onClick={() => this.handleShowDetails()}
        >
          {!showDetails ? 'show' : 'hide'} details
        </button>
      </div>
    );
  }
}
export default Event;

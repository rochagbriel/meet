import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    query: 32,
  };

  handleInputChanged = (event) => {
    let value = event.target.value;
      this.props.updateEvents(null, value);
      this.setState({ query: value });
  };

  render() {
    return (
      <div className='number-of-events'>
        <label className='number-of-events-label'>Number of Events: </label>
        <input
          type='number'
          className='number-of-events-input'
          value={this.state.query}
          onChange={this.handleInputChanged}
        />
      </div>
    );
  }
}

export default NumberOfEvents;

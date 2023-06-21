import React, { Component } from 'react';
import { ErrorAlert } from '../components/Alert';

class NumberOfEvents extends Component {
  state = {
    query: 32,
    errorText: '',
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value < 1 || value > 50) {
      this.setState({
        query: value,
        errorText: 'Please select a number between 1 and 50', // Error message
      });
    } else {
      this.setState({
        query: value,
        errorText: '',
      });
      this.props.updateEvents(null, value);
  };
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
          min={1}
          max={50}
        />
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}

export default NumberOfEvents;

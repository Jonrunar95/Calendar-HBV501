import React, { Component } from 'react';

class Event extends Component {

  constructor(props) {
    super(props);
    const { event } = props;

    this.state = { event };
  }

  render(){
    const { event } = this.state;

    const { startDate, endDate, title, description } = event;

    return (
      <tr>
        <td> {title} </td>
        <td> StartDate: {startDate} </td>
        <td> EndDate: {endDate} </td>
        <td> {description} </td>
      </tr>
    );
  }
}

export default Event;

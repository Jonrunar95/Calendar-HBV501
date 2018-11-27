import React, { Component } from 'react';
import api from '../../api';
import EventTable from '../../components/eventTable';
import { Link, Redirect } from 'react-router-dom';
import querystring from 'querystring';

import './Calendar.css';


class Calendar extends Component {

  constructor(props) {
    super(props);

    const { search: query } = this.props.location;
    const { p = 1 } = querystring.parse(query.replace('?', ''));

    const millisDay = 1000 * 60 * 60 * 24;

    // 00:00 sunday of current week
    let startDate = new Date(new Date().toDateString()).getTime() - (millisDay * (new Date().getDay() - 0));
    // 00:00 saturday of current week
    let endDate = new Date(new Date().toDateString()).getTime() - (millisDay * (new Date().getDay() - 7));

    // Subtract / add 1 week
    startDate += millisDay * 7 * (p - 1);
    endDate += millisDay * 7 * (p - 1);

    this.state = {
      startDate,
      endDate,
      data: null,
      loading: true,
      error: false,
    };
  }

  async componentDidMount() {
    const { startDate, endDate } = this.state;

    try {
      const data = await this.fetchData(startDate, endDate);
      this.setState({ data, loading: false });
    } catch (error) {
      console.error('Error fetching data', error);
      this.setState({ error: true, loading: false });
    }
  }

  async fetchData (startDate, endDate) {
    const url = `/event?startDate=${startDate}&endDate=${endDate}`;
    const response = await api.get(url);
    return response;
  }

  nextPage = () => {
    const { search: query } = this.props.location;
    const { p = 1 } = querystring.parse(query.replace('?', ''));

    const next = Number(p) + 1;
    const path = `/calendar?${querystring.stringify({ p: next })}`;

    window.location = path;
  }

  prevPage = () => {
    const { search: query } = this.props.location;
    const { p = 1 } = querystring.parse(query.replace('?', ''));

    const next = Number(p) - 1;
    const path = `/calendar?${querystring.stringify({ p: next })}`;

    window.location = path;
  }

  render() {
    const { data, loading, error, startDate } = this.state;

    if (loading) {
      return (<div>Hleð inn gögnum...</div>);
    }

    if (error) {
      return (<Redirect to={{pathname: '/login', state: {from: this.props.location}}} />);
    }


    const { data: events } = data;

    return (
        <div className = 'main'>
          <div className = 'takkar'>
              <button className = "calendar-Button button-left" onClick={this.prevPage}></button>
              <Link className = "button-Create" to='event/new'>Create new event</Link>
              <button className = "calendar-Button button-right" onClick={this.nextPage}></button>
            
          </div>
            <div>
              <EventTable data={events} startDate={startDate} />
            </div>
      </div>
    );
  }
}

export default Calendar;

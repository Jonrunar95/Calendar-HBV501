import React, { Component } from 'react';
import api from '../../api';
import EventTable from '../../components/eventTable';
import { Link } from 'react-router-dom'

class Calendar extends Component {

  constructor(props) {
    super(props);

    const { search } = this.props.location;

    const view = search.match(/view=(month|week|day)/);

    const millisDay = 1000 * 60 * 60 * 24;

    let startDate = new Date().getTime() - (millisDay * (new Date().getDay() - 0));
    let endDate = new Date().getTime() - (millisDay * (new Date().getDay() - 7));
    let viewState = 'week';

    if (view) {
      viewState = view[0].replace(/view=/, '');

      if (viewState === 'day') {
        startDate = new Date().getTime() - millisDay;
        endDate = new Date().getTime() + millisDay;
      }
      else if (viewState === 'week') {
        startDate = new Date().getTime() - (millisDay * (new Date().getDay() - 0));
        endDate = new Date().getTime() - (millisDay * (new Date().getDay() - 7));
      }
      else if (viewState === 'month') {
        startDate = new Date().getTime() - (millisDay * (new Date().getDate() - 0));
        endDate = new Date().getTime() - (millisDay * (new Date().getDay() - 31));
      }
    }




    this.state = {
      startDate,
      endDate,
      data: null,
      loading: true,
      error: false,
      view: 'viewState',
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

  render() {
    const { data, loading, error, view } = this.state;

    if (loading) {
      return (<div>Hleð inn gögnum...</div>);
    }

    if (error) {
      return (<div>Villa við að sækja gögn</div>);
    }

    const { data: events } = data;

    return (
        <div>
          <div>
            <button> Back one week </button>
            <button> Forward one week </button>

            <EventTable data={events} view={view} />
          </div>
          <div>
            <Link to='event/new'>Create new event</Link>
          </div>
        </div>
    );
  }
}

export default Calendar;

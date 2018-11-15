import React, { Component } from 'react';
import api from '../../api';

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: 0,
      endDate: 0,
      data: null,
      loading: true,
      error: false,
    };
    this.getEvents = this.getEvents.bind(this);
  }

  async componentDidMount() {
    try {
      const data = await this.fetchData();
      this.setState({ data, loading: false });
    } catch (error) {
      console.error('Error fetching data', error);
      this.setState({ error: true, loading: false });
    }
  }

  async fetchData () {
    const startDate = new Date().getTime() - 604800000
    const endDate = new Date().getTime() + 604800000;
    const url = `/event?startDate=${startDate}&endDate=${endDate}`;
    const response = await api.get(url);
    return response;
  }

  getEvents(data) {
    const cat =
    data.map((event) =>
      <div key={event.id}>
        <p>{event.title}</p>
      </div>
      );
    return cat;
  }

  render() {
    const { data, loading, error } = this.state

    if (loading) {
      return (<div>Hleð inn gögnum...</div>);
    }

    if (error) {
      return (<div>Villa við að sækja gögn</div>);
    }

    return (
        <div>
            {this.getEvents(data.data)}
        </div>
    );
  }
}

export default Calendar;

import React, { Component } from 'react';

class Calendar extends Component {

  state = {
    data: null,
    loading: true,
    error: false
  }

  async componentDidMount() {
    try {
      const data = await this.fetchData();
      this.setState({ data, loading: false });
    } catch (error) {
      console.error('Error fetching school', error);
      this.setState({ error: true, loading: false });
    }
  }

  fetchData = async () => {

    const response = await fetch('localhost:8000');
    const data = await response.json();
    return data;
  }

  render() {
    return (
        <div>
            Home
        </div>
    );
  }
}

export default Calendar;

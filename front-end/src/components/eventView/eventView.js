import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api.js';
import UserList from '../UserList';

import './eventView.css';


class EventView extends Component {
  state = { data: null, loading: true, error: false, errorMsg: '' };

  async componentDidMount() {
    const { id } = this.props;

    try {
      const { data, status } = await api.get(`/event/${id}`);
      if (status === 200) {
        this.setState({ data: data, loading: false });
      } else {
        this.setState({ loading: false, error: true, errorMsg: data.message });
      }
    }
    catch (e) {
      console.error(e);
      this.setState({ loading: false, error: true });
    }
  }

  parseDate(string) {
    const date = new Date(string);

    let parsed = `${date.toDateString()} `;

    parsed += date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
    parsed += date.getMinutes() < 10 ? `:0${date.getMinutes()}` : `:${date.getMinutes()}`;

    return parsed;
  }


  render(){
    const {
      data,
      loading,
      error,
      errorMsg,
    } = this.state

    const { id } = this.props;

    if (loading) {
      return (
        <div>
          Sæki gögn...
        </div>
      );
    }

    if (error) {
      return (
        <div>
          Villa við að sækja gögn.
        </div>
      )
    }

    const {
      startDate: startDateString,
      endDate: endDateString,
      title,
      description,
      users,
    } = data;


    const startDate = this.parseDate(startDateString);
    const endDate = this.parseDate(endDateString);

    return (
      <div className='view-box viewEvent-box'>
        <p> {errorMsg} </p>
        <h3> {title} </h3>
        <p> {startDate} </p>
        <p> {endDate} </p>
        <p> {description} </p>
        <UserList users={users} />
        <div className='link-box'>
          <Link to={`/event/${id}/edit`} className='Button button-link'> Edit Event </Link>
          <Link to={`/event/${id}/share`} className='Button button-link'> Share Event </Link>
          <Link to={'/calendar'} className='Button button-link'> Back </Link>
        </div>
      </div>
    );
  }
}

export default EventView;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api.js';
import UserList from '../UserList';

import './eventShare.css';


class EventShare extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      data: null,
      loading: true,
      error: false
    };

    this.changeUsername = this.changeUsername.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeUsername(event) {
    this.setState({username: event.target.value});
  }

  async componentDidMount() {
    const { id } = this.props;

    try {
      const { data, status } = await api.get(`/event/${id}`);
      if (status === 200) {
        this.setState({ data: data, loading: false });
      } else {
        this.setState({ loading: false });
      }
    }
    catch (e) {
      console.error(e);
      this.setState({ loading: false, error: true });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { username } = this.state;

    const data = [ username ];

    const { id } = this.props;

    console.log(data);

    const response = await api.post(`/event/${id}/users`, data);

    const { status } = response;
    if(status === 200) {
      const { data } = response;
      this.setState({ data });
      console.log(data);
    } else {
      this.setState({ error: true });
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
      username,
    } = this.state

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

    const { url } = this.props


    return (
      <div className='view-box'>
        <h3> {title} </h3>
        <p> {startDate} </p>
        <p> {endDate} </p>
        <p> {description} </p>
        <UserList users={users} />
        <form method='POST'>
          <input className='input' type='text' placeholder='Username' value={username} onChange={this.changeUsername}/>
          <div className='submit-container share-container'>
            <input className='Button' type='submit' value='Share' onClick={this.handleSubmit}/>
          </div>
        </form>
        <div className='link-box'>
          <div className='Button'>
            <Link to={url} className='button-link'> Back </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default EventShare;

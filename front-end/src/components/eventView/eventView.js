import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api.js';
import User from '../User';


class EventView extends Component {
  state = { data: null, loading: true, error: false, errorMsg: '' };

  async componentDidMount() {
    const { id } = this.props;

    try {
      const { data, status } = await api.get(`/event/${id}`);
      if (status === 200) {
        this.setState({ data: data, loading: false });
      } else {
        this.setState({ loading: false, errorMsg: data.message });
      }
    }
    catch (e) {
      console.error(e);
      this.setState({ loading: false, error: true });
    }
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
      startDate,
      endDate,
      title,
      description,
      users,
    } = data;


    return (
      <div>
        <p> {errorMsg} </p>
        <h3> {title} </h3>
        <p> {startDate} </p>
        <p> {endDate} </p>
        <p> {description} </p>
        {users.map((user) =>
          <User key={user.id} username={user.username} name={user.name}/>
        )}
        <Link to={`/event/${id}/edit`}> Edit Event </Link>
        <Link to={'/calendar'}> Back </Link>
      </div>
    );
  }
}

export default EventView;

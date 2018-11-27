import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api.js';
import UserList from '../UserList';


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
      startDate,
      endDate,
      title,
      description,
      users,
    } = data;


    return (
      <div>
        <h3> {title} </h3>
        <p> {startDate} </p>
        <p> {endDate} </p>
        <p> {description} </p>
        <UserList users={users} />
        <form method='POST'>
          <input type='text' placeholder='Username' value={username} onChange={this.changeUsername}/>
          <input type='submit' value='Share' onClick={this.handleSubmit}/>
        </form>
        <Link to={'/calendar'}> Back </Link>
      </div>
    );
  }
}

export default EventShare;

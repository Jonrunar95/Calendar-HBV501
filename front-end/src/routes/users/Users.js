import React, { Component } from 'react';
import api from '../../api';
import User from '../../components/User';

class Users extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      error: false,
    };
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
    const response = api.get('/users');
    return response;
  }

  render() {
    const { data, loading, error } = this.state;



    if (loading) {
      return (<div>Hleð inn gögnum...</div>);
    }

    if (error) {
      return (<div>Villa við að sækja gögn</div>);
    }

    const { data: userList } = data;
    return (
        <div>
          {userList.map((user) =>
            (<User key={user.id} username={user.username} name={user.name}/>)
          )}
        </div>
    );
  }
}

export default Users;

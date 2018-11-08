import React, { Component } from 'react';

class Users extends Component {

  constructor(props) {
    super(props);
    this.state = { 
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
    const response = await fetch('http://localhost:8080/user')
    const data = await response.json();
    return data;
  }

  getEvents(data) {
    const cat = data.map((user) => 
      <div>
        <p>{user.username}</p>
      </div>
    )
    return cat;
  }

  render() {
    const { data, loading, error } = this.state
    console.log(data)

    if (loading) {
      return (<div>Hleð inn gögnum...</div>);
    }

    if (error) {
      return (<div>Villa við að sækja gögn</div>);
    }

    return (
        <div>
            {this.getEvents(data)}
        </div>
    );
  }
}

export default Users;

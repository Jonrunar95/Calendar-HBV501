import React, { Component } from 'react';

class User extends Component {

  constructor(props) {
    super(props);
    const { username, name } = props;
    this.state = {
      username,
      name,
    }
  }

  render(){
    const { username, name } = this.state;

    return (
      <div>
        <h3> {name} </h3>
        <p> {username} </p>
      </div>
    );
  }
}

export default User;

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'


class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedOut: false
    };
  }

  async componentDidMount(){
    const { changeStateLogout } = this.props;
    await changeStateLogout()
    this.setState({loggedOut: true})
  }
  render(){
    const { loggedOut } = this.state
    if(loggedOut===false){
      return (
        <div>
          logging out
        </div>
      );
    }

    return (<Redirect to={{pathname: '/login', state: {from: this.props.location}}} />)

  }
}

export default Logout;

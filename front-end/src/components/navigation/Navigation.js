import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import './Navigation.css';

/* hér ætti að sækja gögn frá vefþjónustu fyrir valmynd */

export default class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: this.props.isAuthenticated
    };
    this.loggedInButton = this.loggedInButton.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (this.props.isAuthenticated !== prevProps.isAuthenticated) {
      this.setState({isAuthenticated: this.props.isAuthenticated})
    }
  }

  handleLogout() {

  }


  loggedInButton() {
    const {isAuthenticated } = this.state
    if(isAuthenticated) {
      return (
      <nav className="nav-bar">
        <div className='Button'>
          <Link className = "button-link" to='/logout'> Logout </Link>
        </div>
        <div className='Button'>
          <Link className = "button-link" to='/calendar'>Calendar </Link>
        </div>

      </nav>
      )
    } else {
      return (
        <nav className="nav-bar">
          <div className='Button'>
            <Link className = "button-link" to='/login'> Login </Link>
          </div>
          <div className='Button'>
            <Link className = "button-link" to='/register'> Register </Link>
          </div>
        </nav>
      )
    }
  }

  render() {
    console.log(this.props.isAuthenticated)

    return (
      <div>
        {this.loggedInButton()}
      </div>
    );
  }
}

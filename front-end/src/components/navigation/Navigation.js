import React, { Component } from 'react';

import './Navigation.css';

/* hér ætti að sækja gögn frá vefþjónustu fyrir valmynd */

export default class Navigation extends Component {

  render() {

    return (
      <nav className="nav-bar">
        <div className='Button'>
          <a href='/login'> Login </a>
          <a  href='/calendar'> Calendar </a>
        </div>
      </nav>
    );
  }
}

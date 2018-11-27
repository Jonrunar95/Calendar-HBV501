import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: null, 
      loading: true, 
      error: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  render() {
    
    return (
        <div className='Buttons'>
          <div className = "homeLion"></div>
          <div className='home-button'>
            <Link className='button-link' to='/users'> Users </Link>
          </div>
          <div className='home-button'>
            <Link className='button-link' to='/register'> Register</Link>
          </div>
        </div>
    );
  }
}

export default Home;

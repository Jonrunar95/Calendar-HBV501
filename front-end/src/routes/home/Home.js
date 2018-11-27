import React, { Component } from 'react';
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
        </div>
    );
  }
}

export default Home;

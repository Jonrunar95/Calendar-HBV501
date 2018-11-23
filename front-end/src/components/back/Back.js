import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Back extends Component {


  render() {

    return (
        <div>
            <Link to="/"> Home </Link>
        </div>
    );
  }
}

export default Back;

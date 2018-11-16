import React, { Component } from 'react';
import EventCreate from '../../components/EventCreate';

class CreateEvent extends Component {

  render(){
    return (<EventCreate pageTitle={'Create Event'} url='/event'/>);
  }
}

export default CreateEvent;

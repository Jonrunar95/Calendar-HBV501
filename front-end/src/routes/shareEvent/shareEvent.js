import React, { Component } from 'react';
import EventShare from '../../components/eventShare';

class ShareEvent extends Component {

  render(){
    const { pathname } = this.props.location;
    const id = pathname.split('/')[2];


    return (
      <EventShare url={`/event/${id}`} id={id}/>
    );
  }
}

export default ShareEvent;

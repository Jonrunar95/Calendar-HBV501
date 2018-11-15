import React, { Component } from 'react';
import EventView from '../../components/eventView';

class ViewEvent extends Component {

  render(){
    const { pathname } = this.props.location;
    const id = pathname.split('/')[2];


    return (<EventView url={`/event/${id}`} id={id}/>);
  }
}

export default ViewEvent;

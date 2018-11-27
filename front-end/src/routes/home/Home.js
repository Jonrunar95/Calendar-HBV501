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
        <div className='Lion'>
          <div className = "homeLion"></div>
          <div className='Vision'>
          This product is for people with dynamic scheduling needs and people who want to organise events with a group. A person whos schedule can change at any moment would profit from these changes being reflected in his schedule by the person responsible for the change. With dynamic event broadcasting any member of a meeting can notify others of a change.
          <br></br>The product is called `Executive Scheduler', it is a visual calendar scheduler that has secure connectivity and broadcasting of events, as well as any changes to these events. This could save valuable time and resources. Unlike facebook which broadcasts events but does not have a visual scheduling service, or Android calendar app which has a visual scheduling interface but no interconnectivity or event creation.
          Our product has Real time updates to visual calendars, which is unheard of in today's main- stream scheduling market.</div>

        </div>
      </div>
    );
  }
}

export default Home;

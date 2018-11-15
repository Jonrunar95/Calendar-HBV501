import React, { Component } from 'react';
import EventCreate from '../../components/EventCreate';
import api from '../../api';

class UpdateEvent extends Component {
  state = { data: null, loading: true, error: false, errorMsg: '' };

  async componentDidMount() {
    const { pathname } = this.props.location;
    const id = pathname.split('/')[3];

    try {
      const { data, status } = await api.get(`/event/${id}`);
      if (status === 200) {
        this.setState({ data: data, loading: false });
      } else {
        this.setState({ loading: false, errorMsg: data.message });
      }
    }
    catch (e) {
      console.error(e);
      this.setState({ loading: false, error: true });
    }
  }

  render(){
    const { pathname } = this.props.location;
    const id = pathname.split('/')[3];

    const { data, loading, error, errorMsg } = this.state;

    if (loading) {
      return (<div> Sæki gögn... </div>);
    }

    if (error) {
      return (<div> Villa við að sækja gögn </div>);
    }

    if (errorMsg) {
      return (<p> {errorMsg} </p>);
    }

    return (<EventCreate data={data} url={`/event/${id}`}/>);
  }
}

export default UpdateEvent;

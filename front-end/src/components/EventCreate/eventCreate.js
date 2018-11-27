import React, { Component } from 'react';
import api from '../../api.js';
import { Redirect, Link } from 'react-router-dom';
import './eventCreate.css';



class EventCreate extends Component {
  constructor(props) {
    super(props);

    const { data } = props;

    const today = new Date();
    const startValue = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}T00:00`;
    const endValue = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}T01:00`;

    if (data) {
      this.state = {
        id: data.id ? data.id : null,
        startDate: data.startDate ? data.startDate.replace(/\+.*/, '') : startValue,
        endDate: data.endDate ? data.endDate.replace(/\+.*/, '') : endValue,
        title: data.title ? data.title : '',
        description: data.description ? data.description : '',
        error: '',
        data: null,
        deleted: false,
      };
    } else {
      this.state = {
        id: null,
        startDate: startValue,
        endDate: endValue,
        title: '',
        description: '',
        error: '',
        data: null,
        deleted: false,
      };
    }


    this.changeStartDate = this.changeStartDate.bind(this);
    this.changeEndDate = this.changeEndDate.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  changeStartDate(event) {
    this.setState({startDate: event.target.value});
  }
  changeEndDate(event) {
    this.setState({endDate: event.target.value});
  }
  changeTitle(event) {
    this.setState({title: event.target.value});
  }
  changeDescription(event) {
    this.setState({description: event.target.value});
  }

  async handleDelete(event) {
    event.preventDefault();

    const { id } = this.state;

    const { status, data } = await api.deleteMethod(`/event/${id}/delete`);

    if (status === 200) {
      this.setState({ deleted: true });
    } else {
      this.setState({ error: data.message });
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    const {
      startDate,
      endDate,
      title,
      description,
    } = this.state;

    const {
      url
    } = this.props;

    const data = {
      startDate: new Date(startDate).getTime(),
      endDate: new Date(endDate).getTime(),
      title,
      description,
    };

    const response = await api.post(url, data);

    const { status } = response;

    if (status === 200) {
      this.setState({ data: response.data });
    } else {
      this.setState({ error: response.data.message });
    }
  }


  render(){

    const {
      startDate,
      endDate,
      title,
      description,
      error,
      data,
      deleted,
    } = this.state

    console.log(startDate);

    if (deleted) {
      return (
        <Redirect to={{pathname: `/calendar`, state: {from: this.props.location}}} />
      );
    }

    const { pageTitle } = this.props;

    if (data) {
        return (<Redirect to={{pathname: `/event/${data.id}`, state: {from: this.props.location}}} />)
    }

    return (
      <div className='login-box createEvent-box'>
        <h2 className="margin_div"> {pageTitle} </h2>
        <div className="change_div">
          <p> {error} </p>
          <form>
            <div className="margin_div">
              <label  className="book_edit_label">
                <div>
                  Start date:
                </div>
                <div>
                  <input className='input' type='datetime-local' value={startDate} onChange={this.changeStartDate}/>
                </div>
              </label>
            </div>
            <div className="margin_div">
              <label className="book_edit_label">
                <div>
                  End date:
                </div>
                <div>
                  <input className='input' type='datetime-local' value={endDate} onChange={this.changeEndDate}/>
                </div>
              </label>
            </div>
            <div className="margin_div">
              <label>
                <div>
                  Title:
                </div>
                <div>
                  <input className='input' type='text' value={title} placeholder='Title' onChange={this.changeTitle}/>
                </div>
              </label>
            </div>
            <div className="margin_div">
            </div>
            <div className="margin_div">
              <label className="book_edit_label">
                <div>
                  Description:
                </div>
                <div>
                  <textarea className='input' value={description} placeholder='Description' onChange={this.changeDescription}/>
                </div>
              </label>
            </div>
            <div className='submit-container'>
              <input className='Button' type='submit' value='Submit' onClick={this.handleSubmit}></input>
              <input className='Button' type='submit' value='Delete' onClick={this.handleDelete}></input>
            </div>
          </form>
          <div className='link-box'>
            <div className='Button'>
              <Link to={'/calendar'} className='button-link'> Back </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventCreate;

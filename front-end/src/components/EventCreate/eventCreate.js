import React, { Component } from 'react';
import api from '../../api.js';


class EventCreate extends Component {
  constructor(props) {
    super(props);

    const { data } = props;

    if (data) {
      this.state = {
        startDate: data.startDate ? data.startDate.replace(/\+.*/, '') : '',
        endDate: data.endDate ? data.endDate.replace(/\+.*/, '') : '',
        title: data.title ? data.title : '',
        description: data.description ? data.description : '',
        error: '',
        data: null,
      };
    } else {
      this.state = {
        startDate: '',
        endDate: '',
        title: '',
        description: '',
        error: '',
        data: null,
      };
    }


    this.changeStartDate = this.changeStartDate.bind(this);
    this.changeEndDate = this.changeEndDate.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeStartDate(event) {
    console.log(event.target.value);
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
    } = this.state

    if (data) {
      return (
        <div>
          <p> {data.id} </p>
          <p> {data.title} </p>
          <p> Start Date: {data.startDate} </p>
          <p> End Date: {data.endDate} </p>
        </div>
      )
    }


    return (
      <div>
        <h2 className="margin_div">Create Event</h2>
        <div className="change_div">
          <p> {error} </p>
          <form>
            <div className="margin_div">
              <label  className="book_edit_label">
                <div>
                  Start date:
                </div>
                <div>
                  <input className="input username" type='datetime-local' value={startDate} onChange={this.changeStartDate}/>
                </div>
              </label>
            </div>
            <div className="margin_div">
              <label className="book_edit_label">
                <div>
                  End date:
                </div>
                <div>
                  <input className="book_edit_input" type='datetime-local' value={endDate} onChange={this.changeEndDate}/>
                </div>
              </label>
            </div>
            <div className="margin_div">
              <label>
                <div>
                  Title:
                </div>
                <div>
                  <input className="book_edit_desc" type='text' value={title} onChange={this.changeTitle}/>
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
                  <textarea className="book_edit_input" value={description} onChange={this.changeDescription}/>
                </div>
              </label>
            </div>
            <div>
              <input className='submit' type='submit' value='submit' onClick={this.handleSubmit}></input>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EventCreate;

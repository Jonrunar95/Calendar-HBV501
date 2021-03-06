import React, { Component } from 'react';
import api from '../../api';
import { Redirect } from 'react-router-dom';
import './Login.css';
//import bcrypt from 'Bcrypt'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
      isAuthenticated: this.props.isAuthenticated,
    };

    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeUsername(event) {
    this.setState({username: event.target.value});
  }

  changePassword(event) {
    this.setState({password: event.target.value});
  }


  async handleSubmit(event) {
    event.preventDefault();
    const {
      username,
      password,
  } = this.state;

    const data = {
      username,
      password,
    }

    const response = await api.post('/login', data);

    console.log(response);
    const { status } = response;
    if(status === 200) {
      window.localStorage.setItem('token', response.data.token)
      console.log(this.props)
      const { changeStateLogin } = this.props
      await changeStateLogin()
    } else if (status === 400) {
      const { data } = response;
      this.setState({ error: data.message });
    }
  }

  render(){

    const {
      username,
      password,
      error,
    } = this.state

    const { isAuthenticated } = this.props;

    if(isAuthenticated===true)  {
      return (<Redirect to={{pathname: '/calendar', state: {from: this.props.location}}} />)
    }

  return (
    <div className = "login-box">
      <h2 className="margin_div">Login</h2>
      <div className="change_div">
        <p> {error} </p>
        <form>
          <div className="margin_div">
            <label  className="book_edit_label">
              <div>
                Username:
              </div>
              <div>
                <input className="input username" type='text' value={username} onChange={this.changeUsername}/>
              </div>
            </label>
          </div>
          <div className="margin_div">
            <label>
              <div>
                Password:
              </div>
              <div>
                <input className="input" type='password' value={password} onChange={this.changePassword}/>
              </div>
            </label>
          </div>
          <div className='submit-container share-container'>
            <input className='submit Button' type='submit' value='Submit' onClick={this.handleSubmit}></input>
          </div>
        </form>
      </div>
    </div>
  );
  }
}

export default Login;

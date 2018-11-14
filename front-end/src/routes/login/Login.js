import React, { Component } from 'react';
//import bcrypt from 'Bcrypt'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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

  
  handleSubmit(event) {
    
    const {
      username,
      password,
  } = this.state;

    const data = {
      username,
      hash: password
    }

    fetch('http://localhost:8080/login', {
      method: 'Post',
      body: JSON.stringify(data)
    })
    .then((response) => {
      alert('User has been added')
      console.log(response)
      //this.props.history.push('/books');
    })
    .catch((err) => {
      if (err.response) {
        alert(err.response.data.error);
      }
    });

  }

  render(){

    const {
      username,
      password,
    } = this.state

  return (
    <div>
      <h2 className="margin_div">Login</h2>
      <div className="change_div">
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
                <input className="book_edit_desc" type='text' value={password} onChange={this.changePassword}/> 
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

export default Login;

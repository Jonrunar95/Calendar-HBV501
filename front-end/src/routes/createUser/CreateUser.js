import React, { Component } from 'react';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
      password: '',
      password2: '',
      samePassword: true
    };

    this.changeUsername = this.changeUsername.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changePassword2 = this.changePassword2.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
  }

  changeUsername(event) {
    this.setState({username: event.target.value});
  }
  changeName(event) {
    this.setState({name: event.target.value});
  }
  changePassword(event) {
    this.setState({password: event.target.value});
  }
  changePassword2(event) {
    this.setState({password2: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      username,
      name,
      password,
      password2
  } = this.state;

  if(password !== password2) {
    this.setState({ samePassword: false })
  }

  else {
    this.setState({ samePassword: true })
    const data = {
      name,
      username,
      hash: password
    }

    fetch('http://localhost:8080/register', {
      method: 'POST',
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
  }

  onClick() {
    this.props.history.push('/books');
  }

  checkPassword = () => {
    const { samePassword } = this.state
    if (samePassword === false) {
      return (<p>Ekki sama password</p>);
    }
    return <p></p>
  }

  render(){

    const {
      username,
      name,
      password,
      password2,
      samePassword
    } = this.state
    const error = this.checkPassword();

    console.log(samePassword)
  return (
    <div>
      {error}
      <h2 className="margin_div">Create User</h2>
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
            <label className="book_edit_label">
              <div>
                Name:
              </div>
              <div>
                <input className="book_edit_input" type='text' value={name} onChange={this.changeName}/>
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
          <div className="margin_div">
          </div>
          <div className="margin_div">
            <label className="book_edit_label">
              <div>
                Password again:
              </div>
              <div>
                <input className="book_edit_input" type='text' value={password2} onChange={this.changePassword2}/>
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

export default CreateUser;

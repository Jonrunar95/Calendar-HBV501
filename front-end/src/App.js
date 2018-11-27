import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import './App.css';
import Home from './routes/home';
import Calendar from './routes/calendar';
import CreateUser from './routes/createUser';
import CreateEvent from './routes/createEvent';
import UpdateEvent from './routes/updateEvent';
import Login from './routes/login';
import ViewEvent from './routes/viewEvent';
import Navigation from './components/navigation';
import Logout from './routes/logout';
import ShareEvent from './routes/shareEvent';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
    this.changeStateLogin = this.changeStateLogin.bind(this);
    this.changeStateLogout = this.changeStateLogout.bind(this);
  }

  async componentDidMount() {
    if(window.localStorage.getItem('token')) {
      this.setState({isAuthenticated: true})
    }
  }

  async changeStateLogin() {
    this.setState({isAuthenticated: true})
  }

  async changeStateLogout() {
    this.setState({isAuthenticated: false})
    window.localStorage.removeItem('token')
  }

  render() {
    const { isAuthenticated } = this.state
    return (
      <main className="main">
        <div>
          <section>
            <BrowserRouter>
              <div>
                <Navigation isAuthenticated={isAuthenticated}/>
                <div className='content'>
                  <Switch>
                    <Route path="/" exact component={Home} />
                    <Route exact path='/event/new' component={CreateEvent}/>
                    <Route exact path='/event/:id/edit' component={UpdateEvent}/>
                    <Route exact path='/event/:id' component={ViewEvent}/>
                    <Route exact path='/event/:id/share' component={ShareEvent}/>
                    <Route exact path="/Calendar" component={Calendar} />
                    <Route exact path='/register' component={CreateUser}/>
                    <Route
                      path='/login'
                      render={props => <Login {...props} changeStateLogin={(this.changeStateLogin)} isAuthenticated={(isAuthenticated)}/>
                  }/>
                  <Route
                    path='/logout'
                    render={props => <Logout {...props} changeStateLogout={(this.changeStateLogout)}/>
                }/>
              </Switch>
                </div>
              </div>
            </BrowserRouter>

          </section>
        </div>
      </main>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import './App.css';
import Home from './routes/home';
import Calendar from './routes/calendar';
import Users from './routes/users';
import CreateUser from './routes/createUser';
import CreateEvent from './routes/createEvent';
import UpdateEvent from './routes/updateEvent';
import Login from './routes/login';
import ViewEvent from './routes/viewEvent';
import Navigation from './components/navigation';
import Back from './components/back';
import Logout from './routes/logout';
import ShareEvent from './routes/shareEvent';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
    this.changeState = this.changeState.bind(this);
  }

  changeState() {
    const { isAuthenticated } = this.state;
    this.setState({isAuthenticated: !isAuthenticated})
    console.log('halló')
  }


  render() {
    const { isAuthenticated } = this.state;
    console.log(isAuthenticated)
    return (
      <main className="main">
        <div className="Content">
          <section>
            <BrowserRouter>
              <div>
                <Navigation isAuthenticated={isAuthenticated}/>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route exact path='/event/new' component={CreateEvent}/>
                  <Route exact path='/event/:id/edit' component={UpdateEvent}/>
                  <Route exact path='/event/:id' component={ViewEvent}/>
                  <Route exact path='/event/:id/share' component={ShareEvent}/>
                  <Route exact path="/Calendar" component={Calendar} />
                  <Route exact path="/Users" component={Users} />
                  <Route exact path='/register' component={CreateUser}/>
                  <Route
                    path='/login'
                    render={props => <Login {...props} changeState={(this.changeState)}/>
                  }/>
                  <Route exact path='/logout' component={Logout}/>
                </Switch>
                <Back/>
              </div>
            </BrowserRouter>

          </section>
        </div>
      </main>
    );
  }
}

export default App;

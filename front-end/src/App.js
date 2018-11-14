import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import './App.css';
import Home from './routes/home';
import Calendar from './routes/calendar';
import Users from './routes/users';
import CreateUser from './routes/createUser';
import Login from './routes/login';
import Navigation from './components/navigation';
import Back from './components/back';

class App extends Component {
  render() {
    return (
      <main className="main">
        <div className="Content">
          <section>
            
            <Navigation/>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route exact path="/Calendar" component={Calendar} />
                <Route exact path="/Users" component={Users} />
                <Route exact path='/register' component={CreateUser}/>
                <Route exact path='/login' component={Login}/>
              </Switch>
            </BrowserRouter>
            <Back/>
          </section>
        </div>
      </main>
    );
  }
}

export default App;

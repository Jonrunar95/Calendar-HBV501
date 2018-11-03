import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import './App.css';
import Home from './routes/home';
import Calendar from './routes/calendar';

class App extends Component {
  render() {
    return (
      <main className="main">
        <div className="Content">
          <section>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route exact path="/Calendar" component={Calendar} />
              </Switch>
            </BrowserRouter>
          </section>
        </div>
      </main>
    );
  }
}

export default App;

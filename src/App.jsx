import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import './App.scss';
import Nav from './components/nav/nav.jsx';
import MapView from './views/map/map';
import WeatherView from './views/weather/weather';

class App extends Component {
  render() {
    return (
      <div className="app-container">

        <Nav />
        <div className='view'>
          <Switch>
            <Route path="/map" component={MapView} />
            <Route path="/weather" component={WeatherView} />
            <Redirect from="*" to="/map" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

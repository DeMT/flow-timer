import React, { Component } from 'react';
import TimeContainer from './time-container/time-container'
import './App.scss';


class App extends Component {

  render() {
    return (
      <div className="page">
        <TimeContainer />
      </div>
    )
  }
}

export default App;

import React from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/home' component={Home} />
    </div>
  );
}

export default App;

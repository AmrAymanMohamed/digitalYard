import React from 'react';
import './App.scss';
import {BrowserRouter as Router,Route } from 'react-router-dom'
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import{AlertView} from './Components'
library.add(fab, fas, faCheckSquare, faCoffee)
function App() {
  return (
    <div className="App">
      <div className="Main">
        <Router>
          <Route exact path='/' component={LoginScreen}/>
          <Route exact path='/home' component={HomeScreen}/>
        </Router>
        <AlertView />
      </div>
    </div>
  );
}

export default App;

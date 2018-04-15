import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './components/AppComponent';
import {BrowserRouter} from 'react-router-dom';

// Render the main component into the dom
ReactDOM.render(<BrowserRouter>
  <AppComponent />
</BrowserRouter>, document.getElementById('app'));

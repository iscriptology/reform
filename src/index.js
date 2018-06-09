import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './components/AppComponent';
import {BrowserRouter} from 'react-router-dom';
import RootStore from 'stores/RootStore';
import {Provider} from 'mobx-react';
import {configure} from 'mobx';

configure({enforceActions: true})

let rootStore = new RootStore();

// Render the main component into the dom
ReactDOM.render(<BrowserRouter>
  <Provider rootStore={rootStore}>
    <AppComponent />
  </Provider>
</BrowserRouter>, document.getElementById('app'));

import React from 'react';
import {Route} from 'react-router-dom';
import {observer} from 'mobx-react';
import HeaderComponent from 'components/header/HeaderComponent';
import DashboardComponent from 'components/dashboard/DashboardComponent';
import {hot} from 'react-hot-loader';

require('normalize.css/normalize.css');
require('styles/App.scss');

@observer
class AppComponent extends React.Component {
  render() {
    return (
      <div id="body">
        <HeaderComponent/>
        <div className="content-container">
          <Route path="/" component={DashboardComponent} />
        </div>
      </div>
    );
  }
}

export default hot(module)(AppComponent);

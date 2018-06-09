import React from 'react';
import {Route} from 'react-router-dom';
import {observer} from 'mobx-react';
import HeaderComponent from 'components/header/HeaderComponent';
import DashboardComponent from 'components/dashboard/DashboardComponent';
import {hot} from 'react-hot-loader';
import {inject} from 'mobx-react/index';

require('normalize.css/normalize.css');
require('styles/App.scss');

@inject("rootStore") @observer
class AppComponent extends React.Component {

  componentDidMount(){

    this.props.rootStore.createNewFormDefinition('My Hungarian citizenship', '/files/AP_2013.pdf');
  }

  render() {
    return (
        <div id="body">
          <HeaderComponent/>
          <div className="content-container">
            <Route path="/forms/:form_id" component={DashboardComponent} />
          </div>
        </div>
    );
  }
}

export default hot(module)(AppComponent);

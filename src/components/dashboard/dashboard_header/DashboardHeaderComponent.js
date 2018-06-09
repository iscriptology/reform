'use strict';

import React from 'react';

import 'firebase/auth';
import {observer, inject} from 'mobx-react/index';
import {Button, Icon} from 'semantic-ui-react';
import {fieldTypes} from 'components/dashboard/data_editor/step/fields/field/field_types/field_types';

require('styles/dashboard/dashboard_header/DashboardHeader.scss');

@inject("rootStore") @observer
class DashboardHeaderComponent extends React.Component {
  constructor(){
    super();
  }

  render() {
    if(this.props.rootStore.currFormDefinition === null) return null;
    if(this.props.rootStore.currFormDefinition.currField === null ||
       this.props.rootStore.currFormDefinition.currField.fieldType === null) {
      return (
        <div ref={(ref) => ref ? this.props.dashboardHeaderRef(ref) : null} className="dashboard-header">
          <h2><a href="#">{this.props.rootStore.currFormDefinition.name}</a></h2>
        </div>
      );
    }

    let PositionComponentClass = fieldTypes[this.props.rootStore.currFormDefinition.currField.fieldType.groupId][this.props.rootStore.currFormDefinition.currField.fieldType.typeId].positionComponent;

    return (
      <div ref={(ref) => ref ? this.props.dashboardHeaderRef(ref) : null} className="dashboard-header">
        <h2><a href="#">{this.props.rootStore.currFormDefinition.name}</a></h2>
        <div className="field-toolbar">
          <PositionComponentClass />
          <Button icon size='mini' positive>
            <Icon name='check' /> Done&nbsp;
          </Button>
          <Button icon size='mini' negative>
            <Icon name='cancel' />
          </Button>
        </div>
      </div>
    );
  }
}

DashboardHeaderComponent.displayName = 'DashboardDashboardHeaderDashboardHeaderComponent';

// Uncomment properties you need
// DashboardHeaderComponent.propTypes = {};
// DashboardHeaderComponent.defaultProps = {};

export default DashboardHeaderComponent;

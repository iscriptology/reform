'use strict';

import React from 'react';
import windowSize from 'react-window-size';
import StepComponent from 'components/dashboard/data_editor/step/StepComponent';
import {inject, observer} from 'mobx-react/index';

require('styles/dashboard/DataEditor.scss');

@inject("rootStore") @windowSize @observer
class DataEditorComponent extends React.Component {

  constructor(){
    super();
    this.state = {
      editing: false
    };
  }
  render() {
    let stepsCount = this.props.rootStore.currFormDefinition.steps.length;
    return this.props.rootStore.currFormDefinition.steps.map((step, i) => (
      <StepComponent stepIndex={i+1} isLast={i === stepsCount-1} isFirst={i === 0} step={step} key={`step-${i}`} />
    ))
  }
}

DataEditorComponent.displayName = 'DashboardDataEditorComponent';

// Uncomment properties you need
// DataEditorComponent.propTypes = {};
// DataEditorComponent.defaultProps = {};

export default DataEditorComponent;

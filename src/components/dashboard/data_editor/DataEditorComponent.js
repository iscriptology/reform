'use strict';

import React from 'react';
import windowSize from 'react-window-size';
import StepComponent from 'components/dashboard/data_editor/step/StepComponent';

require('styles/dashboard/DataEditor.scss');

@windowSize
class DataEditorComponent extends React.Component {

  constructor(){
    super();
    this.state = {
      editing: false
    };
  }
  render() {
    return (
      <StepComponent />
    );
  }
}

DataEditorComponent.displayName = 'DashboardDataEditorComponent';

// Uncomment properties you need
// DataEditorComponent.propTypes = {};
// DataEditorComponent.defaultProps = {};

export default DataEditorComponent;

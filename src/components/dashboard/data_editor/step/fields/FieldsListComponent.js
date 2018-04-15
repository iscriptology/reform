'use strict';

import * as React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import FieldComponent from './field/FieldComponent';

@SortableContainer
class FieldsListComponent extends React.Component {
  render() {
    return (
        <div>
          {this.props.fields.map((field, index) => (
              <FieldComponent key={`field-${index}`} index={index}/>
          ))}
        </div>
    );
  }
}

FieldsListComponent.displayName = 'DashboardDataEditorFieldsListComponent';

// Uncomment properties you need
// DataEditorComponent.propTypes = {};
// DataEditorComponent.defaultProps = {};

export default FieldsListComponent;

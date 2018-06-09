'use strict';

import * as React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import FieldComponent from './field/FieldComponent';
import {observer, inject} from 'mobx-react';

@inject("rootStore") @SortableContainer @observer
class FieldsListComponent extends React.Component {
  render() {
    return (
        <div>
          {this.props.fields.map((field, i) => (
              <FieldComponent key={`field-${i}`} field={field} index={i}/>
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
